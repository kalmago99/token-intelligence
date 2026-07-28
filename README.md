# 🐸 Token Intelligence

**Propietario**: K (@Kalmaguru) — Red Tom Blockchain / La Resistencia Latino  
**Versión**: 1.0  
**Última actualización**: 2026-07-28

---

## 📋 Descripción

Base de datos de inteligencia de tokens en la red **TON**, con fichas individuales, datos on-chain en vivo desde **STON.fi**, **DeDust** y **TON API**. Dashboard web interactivo. Pipeline de actualización automatizada.

| Métrica | Valor |
|---------|-------|
| Total tokens indexados | **699** |
| Fichas individuales (.md) | **661** |
| Tokens con precio en vivo | **63** |
| Tokens con holders verificados | **13** |
| DEX conectadas | STON.fi, DeDust |
| Tokens cross-listados (ambas DEX) | ~33 |
| Datos por token | 22 campos |

---

## 🏗️ Estructura del Proyecto

```
token-fiches/
├── README.md                   ← Este archivo
├── PROJECT_DOCS.md             ← Documentación detallada del proyecto
├── index.json                  ← Base de datos maestra (699 tokens, 22 campos c/u)
│
├── tokens/                     ★ Fichas individuales en Markdown (661 archivos)
│   ├── gram.md                 ─ Token GRAM (INFRAESTRUCTURA)
│   ├── ston.md                 ─ Token STON (DEX/DeFi)
│   ├── not.md                  ─ Token NOT (TAP2EARN)
│   ├── redo.md                 ─ Token REDO (MEME CONSOLIDADO)
│   └── ...                     ─ 660+ fichas más
│
├── dashboard/
│   └── index.html              ★ Dashboard web interactivo (dark theme, mobile-first)
│                                └── Filtros por categoría, logos, badges de exchange, modal detalle
│
├── data/                       ─ Datos crudos descargados de APIs
│   ├── stonfi-assets.json      ─ Assets desde STON.fi API (~15 MB)
│   ├── stonfi-pools.json       ─ Pools desde STON.fi API (~43 MB)
│   ├── dedust-assets.json      ─ Assets desde DeDust API
│   ├── pools-ranked.json       ─ Pools analizados y rankeados por liquidez
│   ├── holders.json            ─ Holders desde tonapi.io
│   └── bullieve*.json          ─ Datos del scraper bullieve
│
├── scripts/                    ★ Pipeline de datos
│   ├── update-all.sh           ─ Orquesta la actualización completa
│   ├── fetch-all-tokens.sh     ─ Descarga assets/pools de STON.fi
│   ├── scan-new-tokens.sh      ─ Detecta tokens nuevos no fichados
│   ├── scan-new-tokens.js      ─ Lógica JS del escáner de tokens nuevos
│   ├── fetch-holders.js        ─ Obtiene holders desde tonapi.io
│   ├── generate-fichas.js      ─ Genera las fichas .md individuales
│   ├── generate_index.js       ─ Genera index.json desde assets
│   ├── analyze_pools.js        ─ Analiza pools y calcula liquidez
│   ├── analyze-pools.sh        ─ Wrapper del análisis de pools
│   └── query.sh                ─ Consultas helper sobre los datos
│
├── build-all.js                ★ Script completo: datos → pools → fichas → index.json
├── cross-ref-dedust.js         ─ Cruce DeDust vs índice STON.fi existente
├── generate-dashboard.js       ─ Genera dashboard (versión STON.fi)
├── generate-dashboard-dex.js   ─ Genera dashboard completo (STON.fi + DeDust)
├── process-results.js          ─ Procesa y normaliza resultados
├── fetch-all.sh                ─ (Legacy) fetch de datos
├── fetch-supply.js             ─ Obtiene supply on-chain
└── retry-missing.sh            ─ Reintenta tokens con datos faltantes
```

---

## ⚙️ Cómo Ejecutar los Scripts

### 🔄 Actualización Completa (update-all.sh)

Orquesta todo el pipeline: fetch → análisis → fichas → index.

```bash
cd /workspace/token-fiches/
bash scripts/update-all.sh
```

**Lo que hace:**
1. Ejecuta `fetch-all-tokens.sh` — descarga assets y pools de STON.fi API
2. Ejecuta el análisis de pools con corrección de liquidez
3. Genera las fichas .md individuales en `tokens/`
4. Reconstruye `index.json`

### 🆕 Escanear Tokens Nuevos (scan-new-tokens.sh)

Compara los assets de STON.fi/DeDust contra el índice actual para encontrar tokens que aún no tienen ficha.

```bash
# Escaneo básico
bash scripts/scan-new-tokens.sh

# Incluir tokens con baja liquidez
bash scripts/scan-new-tokens.sh --include-low-liq

# Filtrar por liquidez mínima
bash scripts/scan-new-tokens.sh --min-liq 1000
```

### 📥 Fetch de Datos (fetch-all-tokens.sh)

Descarga datos en vivo de STON.fi API (assets + pools).

```bash
bash scripts/fetch-all-tokens.sh
```

### 👥 Fetch de Holders (fetch-holders.js)

Obtiene conteo de holders desde tonapi.io para tokens prioritarios.

```bash
node scripts/fetch-holders.js
```

Requiere variable de entorno `TONAPI_KEY` (o usa la key guardada en secrets).

### 🏗️ Build Completo (build-all.js)

Script principal que construye el `index.json` enriquecido a partir de todos los datos:

```bash
node build-all.js
```

### 📊 Generar Dashboard

```bash
# Dashboard básico (STON.fi)
node generate-dashboard.js

# Dashboard completo (STON.fi + DeDust + badges)
node generate-dashboard-dex.js
```

---

## 🔧 Comandos Útiles

```bash
# Contar tokens por categoría
node -e "const i=require('./index.json');const c={};Object.values(i).forEach(t=>{const k=t.category||'?';c[k]=(c[k]||0)+1});console.table(c)"

# Tokens con liquidez > $10K
node -e "const i=require('./index.json');Object.entries(i).filter(([,t])=>(t.liquidity||0)>10000).forEach(([k,t])=>console.log(k,': $'+t.liquidity_str))"

# Tokens cross-listados (STON.fi + DeDust)
node -e "const i=require('./index.json');Object.entries(i).filter(([,t])=>t.dex==='ambos').forEach(([k])=>console.log(k))"

# Ver estado del pipeline (qué tokens tienen datos completos)
node -e "const i=require('./index.json');const c=Object.values(i).filter(t=>t.price&&t.liquidity).length;console.log('Con precio+liquidez:',c,'de',Object.keys(i).length)"
```

---

## 🏷️ Categorías de Tokens

| Categoría | Etiqueta | Cantidad | Riesgo |
|-----------|----------|----------|--------|
| 🟢 **INFRA** | INFRAESTRUCTURA | 18 | Bajo |
| 🔵 **DEX** | DEX / DeFi | 9 | Bajo / Medio |
| 🟡 **T2E** | TAP2EARN / GAMING | 15 | Medio |
| 🔴 **MEME** | MEME CONSOLIDADO | 15 | Alto (tradeable) |
| ☠️ **MESP** | MEME ESPECULATIVO | 642 | Especulativo |

> **Nota sobre MEME CONSOLIDADO**: Memes con comunidad real, actividad en X/Telegram, meses/años en el ecosistema. No son "alto riesgo" en el sentido clásico — son activos tradeables con comunidad real. El riesgo real es rug risk, team doxxing, holder concentration.

---

## 🔗 Fuentes Conectadas

| Fuente | Propósito | Estado |
|--------|-----------|--------|
| **STON.fi API** | Assets, pools, precios, liquidez | ✅ Activo |
| **DeDust API** | Assets (633 tokens adicionales) | ✅ Activo |
| **tonapi.io** | Holders, supply on-chain | ✅ Parcial (13 tokens) |
| **Dashboard Web** | Visualización interactiva | ✅ Desplegado |

---

## 📦 Consumido por

- **@Kryptopulso_bot** — Bot informativo en grupo Telegram
- **Dashboard web** — Cloudflare Worker (acceso directo desde Telegram)

---

## 📝 Estado Actual

| Componente | Estado |
|------------|--------|
| Indexación STON.fi | ✅ 66 tokens |
| Indexación DeDust | ✅ 633 tokens |
| Cross-listados detectados | ✅ ~33 |
| Fichas .md individuales | ✅ 661/699 |
| Dashboard interactivo | ✅ Desplegado |
| Datos de mercado completos | ⚠️ 63/699 (9%) |
| Holders verificados | ⚠️ 13/699 |
| Social Pulse (X + Telegram) | ❌ Pendiente |
| Scanner automático nuevos tokens | ❌ Pendiente |
| Detector de estafas/honeypots | ❌ Pendiente |
| Bot de trading | ❌ Pendiente |

---

## 🧠 Notas para el Desarrollador

### Origen de los datos
- **STON.fi**: 66 tokens con datos de pools, precios y liquidez desde la API pública de STON.fi
- **DeDust**: 633 tokens adicionales desde DeDust Assets API, pendientes de análisis completo
- **Holders**: Solo 13 tokens prioritarios tienen holders verificados (NOT, STON, REDO, etc.)
- **Precios**: 63 tokens tienen precio en vivo; el resto son placeholders con solo contract address

### Pipeline de datos
1. `fetch-all-tokens.sh` → descarga cruda de APIs
2. `analyze_pools.js` → calcula liquidez real por pool
3. `generate-fichas.js` → crea/actualiza fichas .md en `tokens/`
4. `generate_index.js` o `build-all.js` → reconstruye `index.json`
5. `generate-dashboard-dex.js` → regenera dashboard

### Categorización automática
Los tokens de DeDust reciben categorización automática (MESP por defecto). Los tokens STON.fi tienen categorización manual en el índice. Revisar tokens DeDust periódicamente para reclasificar.

### Consideraciones técnicas
- `index.json` pesa ~724 KB — se regenera completo cada vez
- `data/` contiene archivos JSON que pueden pesar hasta ~46 MB (stonfi-pools.json)
- El dashboard usa rutas relativas — funciona bajo path prefix de Cloudflare Worker
- No hay base de datos externa: todo se sirve desde `index.json`

### Stack
- **Runtime**: Node.js (scripts de pipeline)
- **Dashboard**: HTML + CSS vanilla (sin frameworks), JavaScript puro
- **Deploy**: Cloudflare Worker (assets estáticos)
- **Datos**: JSON plano, sin DB

---

> ⚠️ **DYOR** — Esto no es consejo financiero. Todos los datos son informativos y pueden contener errores. Verifica siempre antes de invertir.

---

*Generado por Krypto Analyst — Última actualización: 2026-07-28*
