#!/usr/bin/env bash
# Stores the GitHub token the contribution form uses to open issues.
# Read from a hidden prompt, so it never shows on screen, in shell history
# or in any command line. Run again with a new token to rotate it.
set -euo pipefail
ENV=/opt/pcport/.env
read -rsp "Cole o token NOVO e aperte Enter (a tela nao mostra nada): " T; echo
if [ -z "$T" ]; then echo "nada colado, nada mudou"; exit 1; fi
case "$T" in github_pat_*|ghp_*) ;; *) echo "isso nao parece um token do GitHub; nada mudou"; unset T; exit 1;; esac
tmp=$(mktemp)
grep -v "^GITHUB_ISSUES_TOKEN=" "$ENV" > "$tmp" || true
printf "GITHUB_ISSUES_TOKEN=%s\n" "$T" >> "$tmp"
cat "$tmp" > "$ENV"; rm -f "$tmp"; unset T
cd /opt/pcport && docker compose up -d >/dev/null 2>&1
echo "PRONTO - token gravado e site reiniciado"
