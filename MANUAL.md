# Token Intelligence — MANUAL TÉCNICO

## Versión
v1.0 (primera generación)

## Estructura
- /scripts/
  - fetch-all-tokens.sh → descarga assets y pools de STON.fi
  - fetch-holders.js → holders desde tonapi.io
  - scan-new-tokens.sh → tokens nuevos no fichados
  - update-all.sh → orquesta todo
- /data/
  - index.json → índice completo de tokens (698 tokens)
  - tokens/ → fichas individuales (70 con datos vivos)
  - dashboard/ → dashboard HTML

## Ficha de token (ejemplo GROYP.json)
{
  symbol, name, contract (jetton master),
  category, risk, phase,
  price, liquidity, volume_24h, mcap, total_supply,
  holders, social (x, tg, web),
  tags, dex, analysis
}

## APIs que consume
- STON.fi API (https://api.ston.fi/v1/) → assets, pools, prices
- TONAPI.io (https://tonapi.io/v2/) → holders, jettons

## Comandos útiles
```bash
# Actualizar todo
bash scripts/update-all.sh

# Escanear tokens nuevos
bash scripts/scan-new-tokens.sh

# Fetch solo holders
npm run fetch-holders
```

## Categorías de riesgo
🟢 Bajo → INFRA, DEX consolidados
🟡 Medio → T2E, gaming con producto
🔴 Alto → MEME consolidado
☠️ Especulativo → MEME sin utilidad real

## Notas
- 70 tokens con datos vivos de 698 fichados
- 628 tokens fantasmas (sin precio/liquidez)
- Dashboard: index.html auto-generado
