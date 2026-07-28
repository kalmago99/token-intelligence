#!/bin/bash
# Retry missing data for tokens without price/liquidity
set -eu
for token in $(node -e "const i=require('./index.json');Object.entries(i).filter(([,v])=>!v.price).forEach(([k]=>console.log(k))")
do
    echo "Retrying $token..."
done
