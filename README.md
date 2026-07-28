# 🐸 Token Intelligence — Sistema de Fichas TON

Sistema de fichas de análisis propietarias sobre **698+ tokens** listados en **STON.fi** (principal DEX de la red TON), con **70 fichas con datos vivos** y precios actualizados.
Creado para **K (@Kalmaguru)** como parte del proyecto **La Resistencia** en la **Red Tom Blockchain**.

---

## 📋 Versión
**v1.0** (primera generación) — Base de datos de 698 tokens, 70 con fichas activas.

## 🎯 Propósito

Centralizar información crítica sobre tokens del ecosistema TON para toma de decisiones informada:

- **Datos on-chain en vivo** desde STON.fi API y TONAPI.io
- **Clasificación en 5 categorías**: INFRAESTRUCTURA, DEX/DeFi, TAP2EARN/GAMING, MEME CONSOLIDADO, MEME ESPECULATIVO
- **Análisis cualitativo** de cada proyecto (equipo, historia, señales)
- **Dashboard web interactivo** con filtros, logos y modales

## 🗂️ Estructura del Proyecto

```
token-fiches/
├── README.md                ← Este documento
├── PROJECT_DOCS.md          ← Documentación interna
├── MANUAL.md                ← Manual técnico detallado
├── index.json               ← Índice completo de 698+ tokens
├── build-all.js             ← Script de generación completa
├── tokens/                  ← Fichas individuales (.md)
│   ├── gram.md, ston.md, not.md, redo.md...
│   └── ... (70+ fichas activas)
├── data/                    ← Datos crudos de APIs
│   ├── stonfi-assets.json   ← Assets desde STON.fi
│   ├── stonfi-pools.json    ← Pools desde STON.fi
│   ├── pools-ranked.json    ← Pools rankeados
│   ├── dedust-assets.json   ← Assets desde DeDust
│   ├── holders.json         ← Holders desde TONAPI
│   └── ...
├── dashboard/
│   └── index.html           ← Dashboard web interactivo
└── scripts/                 ← Herramientas de terminal
    ├── update-all.sh         ← Orquesta todo el pipeline
    ├── fetch-all-tokens.sh   ← Descarga assets y pools
    ├── fetch-holders.js      ← Consulta holders desde TONAPI
    ├── scan-new-tokens.js    ← Detecta tokens nuevos no fichados
    ├── generate-fichas.js    ← Genera fichas individuales
    ├── generate_index.js     ← Genera índice general
    ├── analyze-pools.sh      ← Análisis de pools
    ├── analyze_pools.js      ← Análisis detallado de pools
    ├── query.sh              ← Consultas personalizadas vía terminal
    └── retry-missing.sh      ← Reintenta consultas fallidas
```

## 🔄 Comandos Útiles

```bash
# Actualizar TODO (assets + pools + fichas + dashboard)
bash scripts/update-all.sh

# Solo escanear tokens nuevos no fichados
bash scripts/scan-new-tokens.sh

# Solo holders desde TONAPI
node scripts/fetch-holders.js

# Consulta rápida de tokens desde terminal
bash scripts/query.sh
```

## 📊 Dashboard Web

Abrir `dashboard/index.html` en navegador o acceder a la URL desplegada del sitio.

## 📋 APIs que Consume

| API | Uso | Endpoint |
|-----|-----|----------|
| STON.fi API | Assets, pools, precios | https://api.ston.fi/v1/ |
| TONAPI.io | Holders, jettons, blockchain | https://tonapi.io/v2/ |
| DeDust API | Pools cross-DEX | https://api.dedust.io/v2/ |

## 🏷️ Categorías y Riesgo

| Categoría | Riesgo | Descripción |
|-----------|--------|-------------|
| 🟢 INFRAESTRUCTURA | Bajo | GRAM, USD₮, staking, puentes |
| 🔵 DEX / DeFi | Bajo | STON, SP, RAFF |
| 🟡 TAP2EARN / GAMING | Medio | NOT, DOGS, CATI, MAJOR |
| 🔴 MEME CONSOLIDADO | Alto | REDO, GEMSTON, ANON, TPET |
| 💜 MEME ESPECULATIVO | ☠️ Especulativo | Micro liquidez, sin comunidad |

## 📈 Estado Actual

- **698 tokens** fichados en índice
- **70 tokens** con datos vivos (precio, liquidez, volumen)
- **628 tokens fantasmas** (sin precio/liquidez detectada)
- Dashboard auto-generado con `generate-dashboard.js`

## Ficha de Token (Ejemplo)

```json
{
  "symbol": "GROYP",
  "name": "Groyp TON",
  "contract": "EQD...",
  "category": "MEME",
  "risk": "Especulativo",
  "price": 0.000001,
  "liquidity": 50000,
  "volume_24h": 1200,
  "mcap": 100000,
  "holders": 850,
  "social": { "x": "...", "tg": "...", "web": "..." },
  "dex": ["STON.fi"]
}
```

> ⚠️ **DYOR** — No es consejo financiero. Siempre haz tu propia investigación antes de invertir.

*Última actualización: 2026-07-28*
