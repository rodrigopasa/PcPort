#!/usr/bin/env bash
# Lists contributions sent through the site's form, newest first.
#
#   deploy/submissions.sh                 # the last 20, without names or emails
#   deploy/submissions.sh 50              # the last 50
#   deploy/submissions.sh 20 --private    # include name and email, to reply
#
# Every submission is stored on the server whether or not GITHUB_ISSUES_TOKEN
# is set, so this is the inbox of record; the GitHub issues are a convenience
# on top of it. Names and emails are shown only when asked for, because they
# are the one thing in here that is not ours to spread around.
set -euo pipefail

HOST="${PCPORT_HOST:-root@178.104.196.185}"
KEY="${PCPORT_KEY:-$HOME/.ssh/id_ed25519}"
export N="${1:-20}"
export PRIVATE=0
[ "${2:-}" = "--private" ] && PRIVATE=1

# The program is passed with -c from a quoted heredoc so it can use both kinds
# of quote freely; stdin stays free for the data.
PROGRAM="$(cat <<'PY'
import json, os, sys

rows = [json.loads(line) for line in sys.stdin if line.strip()]
if not rows:
    print('nenhum envio ainda')
    sys.exit()

private = os.environ['PRIVATE'] == '1'
n = int(os.environ['N'])
print(f'{len(rows)} envios no total, mostrando os {min(n, len(rows))} mais recentes\n')

for r in reversed(rows[-n:]):
    issue = f"#{r['issue']}" if r.get('issue') else 'sem issue'
    when = r['at'][:16].replace('T', ' ')
    print(f"[{when}] {r['kind'].upper():8} {issue:9} id {r['id']}")
    for k in ('port', 'reason', 'game', 'console', 'project', 'url', 'method', 'status'):
        if r.get(k):
            print(f'    {k:8} {r[k]}')
    if r.get('platforms'):
        print(f"    {'roda em':8} {', '.join(r['platforms'])}")
    if r.get('notes'):
        notes = r['notes'].replace('\n', '\n             ')
        print(f'    notas    {notes}')
    if private and (r.get('name') or r.get('email')):
        print(f"    contato  {r.get('name') or '-'} <{r.get('email') or '-'}>")
    print()
PY
)"

ssh -i "$KEY" "$HOST" \
  "docker run --rm -v pcport_submissions:/s alpine sh -c 'cat /s/submissions.jsonl 2>/dev/null || true'" |
  python3 -c "$PROGRAM"
