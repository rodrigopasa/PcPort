#!/usr/bin/env bash
# Pulls the catalog the ingestion workflow published and tells the site to
# pick it up. Runs on the host, from cron.
#
#   /opt/pcport/deploy/sync-catalog.sh
#
# Why this exists: the hourly GitHub workflow commits fresh data to the
# repository, but nothing carried it to production. The catalog used to be
# compiled into the bundle, so even /api/revalidate regenerated pages from the
# same frozen data — the automation looked alive and changed nothing.
#
# Now the container reads the catalog from a volume, so this is the whole
# delivery: fetch, compare, write, revalidate. No rebuild, no deploy, no
# downtime.
#
# A public repository needs no credentials. A private one needs a read-only
# token in GITHUB_TOKEN inside /opt/pcport/.env — note that an hourly workflow
# on a private repository also burns roughly 2400 Actions minutes a month,
# against a 2000-minute free allowance, while public repositories are
# unlimited.
set -euo pipefail

REPO="rodrigopasa/PcPort"
REPO_RAW="https://raw.githubusercontent.com/$REPO/main/lib"

# Optional: only needed while the repository is private.
GITHUB_TOKEN="$(grep -E '^GITHUB_TOKEN=' /opt/pcport/.env 2>/dev/null | cut -d= -f2- || true)"
AUTH=()
[ -n "${GITHUB_TOKEN:-}" ] && AUTH=(-H "Authorization: Bearer $GITHUB_TOKEN")
VOLUME="pcport_catalog-data"
FILES="catalog.json shots.json fandom.json covers.json"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

changed=0

for f in $FILES; do
  if ! curl -fsS -m 60 "${AUTH[@]}" "$REPO_RAW/$f" -o "$TMP/$f"; then
    echo "sync: falhou ao baixar $f, abortando sem alterar nada"
    [ -z "${GITHUB_TOKEN:-}" ] && echo "       (repositorio privado? defina GITHUB_TOKEN em /opt/pcport/.env)"
    exit 1
  fi
  # Refuse an empty or truncated file rather than publishing a broken catalog.
  if ! python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$TMP/$f" 2>/dev/null; then
    echo "sync: $f nao e JSON valido, abortando"
    exit 1
  fi

  atual="$(docker run --rm -v "$VOLUME":/d alpine cat "/d/$f" 2>/dev/null || echo '')"
  if [ "$(cat "$TMP/$f")" != "$atual" ]; then
    changed=1
  fi
done

if [ "$changed" -eq 0 ]; then
  echo "sync: nada mudou"
  exit 0
fi

# Write all four together: a half-updated catalog would render entries whose
# images point at rows that no longer exist.
docker run --rm -v "$VOLUME":/d -v "$TMP":/src:ro alpine \
  sh -c 'for f in catalog.json shots.json fandom.json covers.json; do cp "/src/$f" "/d/$f"; done'

# The container publishes no port — it is reachable only on the proxy network —
# so the call is made from inside it rather than from the host.
TOKEN="$(grep -E '^REVALIDATE_TOKEN=' /opt/pcport/.env | cut -d= -f2-)"
code="$(docker exec -e TOKEN="$TOKEN" pcport-app node -e '
fetch("http://127.0.0.1:3000/api/revalidate", {
  method: "POST",
  headers: { "content-type": "application/json", "x-revalidate-token": process.env.TOKEN },
  body: JSON.stringify({ slugs: [] }),
}).then(r => { process.stdout.write(String(r.status)) })
  .catch(() => process.stdout.write("000"))
' 2>/dev/null || echo 000)"

echo "sync: catalogo atualizado, revalidate HTTP $code"

# Revalidating drops the rendered pages, so the next visitor would pay the cold
# price again — 800–1100 ms against ~100 ms warm, because the origin is in
# Germany. Walking the sitemap puts them back in the edge cache first.
# Four at a time: this shares a host with a dozen other sites.
warmed=0
while read -r url; do
  [ -z "$url" ] && continue
  curl -s -o /dev/null -m 30 "$url" &
  warmed=$((warmed + 1))
  [ $((warmed % 4)) -eq 0 ] && wait
done < <(curl -s -m 60 https://pcport.org/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g')
wait

echo "sync: $warmed paginas aquecidas no cache da borda"
