#!/bin/bash
# Legacy fetch script
set -eu
curl -s https://api.ston.fi/v1/assets > data/stonfi-assets.json
curl -s https://api.ston.fi/v1/pools > data/stonfi-pools.json
echo "Fetch complete"
