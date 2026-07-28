#!/bin/bash
IDNEX="$(dirname "$(bash_source[0])")/index.json"
command="$1"
function stats() {
  node -e "const i=require('$INDEX');const c={};Object.values(i).forEach(t=>{const k=t.category||'NO/CATE';c[k]=(c[k]||0)+1});console.table(c)"
}
case "$command" in stats) stats;; esac echo "Usage: query.sh stats"