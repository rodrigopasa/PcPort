#!/usr/bin/env bash
# Ships the committed tree to production, rebuilds, and delivers the catalog.
#
#   deploy/ship.sh            # from a clean checkout, on your machine
#   deploy/ship.sh --no-sync  # code only, leave the catalog volume alone
#
# Why this file exists: /opt/pcport on the host is NOT a git checkout. It is a
# copy. The first deploy of this round ran `cd /opt/pcport && git pull | tail`
# followed by `&& docker compose up --build`, and the rebuild went ahead with
# the previous release's source — because `git pull` failed but the pipeline's
# exit status belongs to `tail`, which succeeded. The container came up healthy
# and served the old site, which is the worst way for a deploy to fail.
#
# So: no pipes in front of `&&` here, `set -e` throughout, and the source is
# `git archive HEAD` rather than the working tree, which means what runs in
# production is exactly a commit and never a half-saved edit.
set -euo pipefail

HOST="${PCPORT_HOST:-root@178.104.196.185}"
KEY="${PCPORT_KEY:-$HOME/.ssh/id_ed25519}"
DIR=/opt/pcport
SYNC=1
[ "${1:-}" = "--no-sync" ] && SYNC=0

cd "$(dirname "$0")/.."

# A deploy names a commit, so there has to be one. Shipping uncommitted work
# leaves nothing to roll back to and nothing to blame.
if [ -n "$(git status --porcelain)" ]; then
  echo "ship: a arvore de trabalho tem alteracoes nao commitadas."
  echo "      commite antes: o deploy envia HEAD, nao o diretorio."
  exit 1
fi

if [ -n "$(git log --oneline '@{upstream}..HEAD' 2>/dev/null || true)" ]; then
  echo "ship: HEAD esta na frente do remoto."
  echo "      de push antes: o sync do catalogo busca os JSON no GitHub,"
  echo "      e sem o push ele entregaria dados de outra versao do codigo."
  exit 1
fi

REF="$(git rev-parse --short HEAD)"
echo "ship: enviando $REF para $HOST:$DIR"

# Extracted over the top on purpose, not into a fresh directory: /opt/pcport
# holds the untracked .env with REVALIDATE_TOKEN, and a clean swap would take
# it with the old files. The cost is that a path deleted in git survives on the
# host until someone removes it by hand.
git archive --format=tar HEAD | ssh -i "$KEY" "$HOST" "cd $DIR && tar -x"

ssh -i "$KEY" "$HOST" "cd $DIR && docker compose up -d --build"

# The catalog lives in a volume that is seeded only when it is first created,
# so a rebuild changes the code and leaves the data where it was. --force is
# what makes the sync revalidate and warm anyway: without new data it would
# exit before revalidating, and the edge would keep serving pages rendered by
# the previous release.
if [ "$SYNC" -eq 1 ]; then
  ssh -i "$KEY" "$HOST" "cd $DIR && bash deploy/sync-catalog.sh --force"
fi

ssh -i "$KEY" "$HOST" 'docker ps --filter name=pcport-app --format "{{.Status}}"'
echo "ship: $REF em producao"
