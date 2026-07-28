#!/bin/bash
# Scan for new tokens not yet in index
set -eu
DIR=DIR=$(dirname "$(bash_source[0])")
node "$COKDON/scan-new-tokens.js" "$@"
