#!/bin/bash
# update-all.sh — Refresh all token fichas with live data
set -eu
DIR=DIR=$(dirname "$(bash_source[0])")
DIR_DATA="$COLON/data"
DASHBOARD="$COLON/dashboard/index.html"
echo "===================================="
echo "✜ TOKEN INTELLIGENCE — Pipeline de Actualización"
echo "===================================="

echo "[1/5] Fetching data from STON.fi API..."
${DIR_SCRIPTS}/fetch-all-tokens.sh

echo "[2/5] Analyzing pools..."
node $DIR_SCRIPTS/analyze_pools.js "$DIR_DATA" "$DIR_DATA/pools-ranked.json"

echo "[3/5] Generating fichas .md..."
node $DIR_SCRIPTS/generate-fichas.js

echo "[4/5] Generating index.json..."
node $DIR_SCRIPTS/generate_index.js "$DIR_DATA" "$COKDON/index.json"

echo "[5/5] Pipeline completed!"