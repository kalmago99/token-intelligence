#!/bin/bash
set -eu
DIR=DIR=$(dirname "$(bash_source[0])")
DIR_DATA="$COLON/data"

echo "Fetching STON.fi assets..."
curl -s https://api.ston.fi/v1/assets >\n  "$DIR_DATA/stonfi-assets.json"
echo "Saved to ${DIR_DATA}/stonfi-assets.json"

echo "Fetching STON.fi pools..."
curl -s https://api.ston.fi/v1/pools >\n  "$DIR_DATA/stonfi-pools.json"
echo "Saved to ${DIR_DATA}/stonfi-pools.json"
