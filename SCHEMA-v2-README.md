# Token Intelligence — Ficha de Token (SCHEMA v2)

Formato: JSON, una ficha por archivo `tokens/{ca}.json`
Encoding: UTF-8 · Fechas: ISO 8601 UTC · Números: float máx 6 decimales, `null` si desconocido

## Estructura (resumen)

| Sección | Contenido |
|---|---|
| raíz | schema_version, ca, ticker, name, status, first_seen, last_updated, source |
| socials | telegram, twitter, website, discord, github, medium, other[] |
| description | short (≤140), full (libre) |
| media | logo_url, banner_url, video_url |
| on_chain | deployer, deploy_time, total_supply, decimals, mintable, renounced, verified |
| market | price_usd, price_ton, mc_usd, mc_ton, fdv_usd, volume_24h_usd, volume_24h_ton, change_1h/24h/7d_pct, ath_usd, atl_usd |
| liquidity | total_usd, total_ton, dexes[] (name, pool_address, liquidity_usd, locked, lock_expiry, lock_provider) |
| holders | total, growing, change_24h, top_10 (count/pct_supply/addresses), top_50, lp_wallets_excluded, whales[] |
| trading | buys_24h, sells_24h, buy_sell_ratio, avg_trade_size_usd |
| risk | score 0-100, level (low/medium/high/critical), flags[], warnings[], blacklisted |
| context | dev_known, dev_name, dev_history[], community_notes, related_tokens[], calls_seen_in[] |
| history | eventos: deploy, lp_lock, renounce, mint, transfer... |
| _meta | exported_by, export_time, data_quality |

## Campos obligatorios (mínimo viable)

ca · ticker · status · first_seen · last_updated · market.price_usd · market.mc_usd

## Flags de riesgo (risk.flags)

| Flag | Significado |
|---|---|
| DEV_KNOWN | Deployer conocido, buena reputación |
| DEV_METRALLETA | Deployer con 50+ tokens, posible spam de deploys |
| BLACKLISTED_DEV | Deployer en lista negra |
| LP_LOCKED | Liquidez bloqueada (ver lock_expiry) |
| LP_NOT_LOCKED | Liquidez no bloqueada |
| HIGH_CONCENTRATION | Top 10 holders concentran >50% supply |
| COMMUNITY_ACTIVE | Comunidad activa, callers presentes |
| NEW_DEPLOY | Desplegado recientemente (<48h) |
| REDEPLOY | Token re-desplegado (cambio de CA) |
| RENOUNCED | Contrato renunciado |
| MINTABLE | Supply ampliable por el dev |
| VERIFIED | Verificado en el explorador |

## Warnings (risk.warnings)

HIGH_CONCENTRATION · NEW_DEPLOY · NO_LIQUIDITY · LOW_VOLUME · DEV_HOLDINGS_HIGH · SUSPICIOUS_ACTIVITY

## Reglas

- Nunca inventar datos: si no hay dato, `null`
- `_meta.data_quality`: high (todo verificado), medium (parcial), low (estimado), partial (incompleto)
- `status` refleja el último análisis: active / dead / scam / unknown / watchlist
- `history` es append-only: cada evento nuevo se añade, no se borra
- Fuente de verdad: GitHub `kalmago99/token-intelligence`, carpeta `tokens/{ca}.json`
- Export a SQLite/CSV/Excel: trivial desde estos JSON

## Export

- `git clone https://github.com/kalmago99/token-intelligence` → `tokens/`
- Los JSON son legibles en VS Code, navegador, o cualquier editor
- Script `export-csv.js` (en scripts/) genera CSV plano desde la carpeta tokens/
