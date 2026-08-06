#!/usr/bin/env node
// build-schema2.js — Migra el JSON plano del dashboard (top100-live.json) a fichas schema v2
// Entrada: top100-live.json (array con symbol,name,contract,price,liquidity,volume_24h,...)
// Salida: tokens/{ca}.json — una ficha por token
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || '/tmp/top100-live.json';
const OUT_DIR = process.argv[3] || path.join(__dirname, '..', 'tokens');

if (!fs.existsSync(SRC)) { console.error('No existe:', SRC); process.exit(1); }
const arr = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(arr)) { console.error('El source debe ser un array'); process.exit(1); }

fs.mkdirSync(OUT_DIR, { recursive: true });

function statusOf(t) {
  if (t.fresh) return 'watchlist';
  if (t.analysis?.riesgo === 'Bajo') return 'active';
  if (t.liquidity > 0 && t.mcap > 0) return 'active';
  return 'unknown';
}
function riskLevel(t) {
  const r = t.analysis?.riesgo || '';
  if (/bajo/i.test(r)) return 'low';
  if (/medio|moderad/i.test(r)) return 'medium';
  if (/alto|especulativ/i.test(r)) return 'high';
  return 'medium';
}
function riskFlags(t) {
  const flags = [];
  if (t.tags?.includes('high_liquidity')) flags.push('LP_LOCKED');
  if (t.fresh) flags.push('NEW_DEPLOY');
  if (/bajo/i.test(t.analysis?.riesgo || '')) flags.push('COMMUNITY_ACTIVE');
  return flags;
}

let n = 0, skipped = 0;
for (const t of arr) {
  const ca = t.contract;
  if (!ca) { skipped++; continue; }
  const now = new Date().toISOString();
  const ficha = {
    schema_version: '2.0',
    ca,
    ticker: t.symbol || '',
    name: t.name || '',
    status: statusOf(t),
    first_seen: t.fresh ? now : null,
    last_updated: now,
    source: 'multiple',
    socials: {
      telegram: t.social?.telegram || '',
      twitter: t.social?.x || '',
      website: t.social?.web || '',
      discord: '', github: '', medium: '', other: []
    },
    description: {
      short: (t.description || '').slice(0, 140) || null,
      full: t.description || null
    },
    media: { logo_url: t.image_url || null, banner_url: null, video_url: null },
    on_chain: {
      deployer: null, deploy_time: null,
      total_supply: t.total_supply != null ? String(t.total_supply) : null,
      decimals: t.decimals ?? null,
      mintable: null, renounced: null, verified: null
    },
    market: {
      price_usd: t.price ?? null,
      price_ton: null,
      mc_usd: t.mcap ?? null,
      mc_ton: null,
      fdv_usd: null,
      volume_24h_usd: t.volume_24h ?? null,
      volume_24h_ton: null,
      change_1h_pct: null, change_24h_pct: null, change_7d_pct: null,
      ath_usd: null, atl_usd: null
    },
    liquidity: {
      total_usd: t.liquidity ?? null,
      total_ton: null,
      dexes: (t.dex || []).map(name => ({
        name, pool_address: null, liquidity_usd: null,
        locked: null, lock_expiry: null, lock_provider: null
      }))
    },
    holders: {
      total: t.holders ?? null, growing: null, change_24h: null,
      top_10: null, top_50: null, lp_wallets_excluded: null, whales: []
    },
    trading: { buys_24h: null, sells_24h: null, buy_sell_ratio: null, avg_trade_size_usd: null },
    risk: {
      score: t.analysis?.riesgo === 'Bajo' ? 30 : t.fresh ? 80 : 55,
      level: riskLevel(t),
      flags: riskFlags(t),
      warnings: t.fresh ? ['NEW_DEPLOY'] : [],
      blacklisted: false
    },
    context: {
      dev_known: null, dev_name: null, dev_history: [], community_notes: t.analysis?.comunidad || null,
      related_tokens: [], calls_seen_in: []
    },
    history: t.fresh ? [{ timestamp: now, event: 'first_seen', data: {} }] : [],
    _meta: {
      exported_by: 'CriptoPulso v4',
      export_time: now,
      data_quality: (t.price && t.liquidity) ? 'medium' : 'partial'
    }
  };
  fs.writeFileSync(path.join(OUT_DIR, ca + '.json'), JSON.stringify(ficha, null, 2));
  n++;
}
console.log('Fichas creadas:', n, '| omitidas (sin CA):', skipped);
