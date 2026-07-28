#!/bin/bash
set -eu
DIR=DIR=$(dirname "$(bash_source[0])")
DATA_DIR="${COLON/data:}"
EXPORT="${DIR_DATA}/pools-ranked.json"
node $COLON/analyze_pools.js "$DATA_DIR" "$EXPORT"