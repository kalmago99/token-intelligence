#!/usr/bin/env node
// export-csv.js — Convierte tokens/{ca}.json en un CSV plano
// Uso: node export-csv.js [directorio] [salida.csv]
const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || path.join(__dirname, '..', 'tokens');
const out = process.argv[3] || 'tokens-export.csv';

if (!fs.existsSync(dir)) {
  console.error('No existe el directorio:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const rows = [];

for (const f of files) {
  try {
    const t = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    rows.push({
      ca: t.ca || '',
      ticker: t.ticker || '',
      name: t.name || '',
      status: t.status || '',
      price_usd: t.market?.price_usd ?? '',
      mc_usd: t.market?.mc_usd ?? '',
      volume_24h_usd: t.market?.volume_24h_usd ?? '',
      change_24h_pct: t.market?.change_24h_pct ?? '',
      liquidity_usd: t.liquidity?.total_usd ?? '',
      holders: t.holders?.total ?? '',
      risk_score: t.risk?.score ?? '',
      risk_level: t.risk?.level ?? '',
      flags: (t.risk?.flags || []).join('|'),
      first_seen: t.first_seen || '',
      last_updated: t.last_updated || '',
      source: t.source || ''
    });
  } catch (e) {
    console.error('Error en', f, e.message);
  }
}

const headers = Object.keys(rows[0] || {});
const csv = [
  headers.join(','),
  ...rows.map(r => headers.map(h => {
    const v = String(r[h] ?? '');
    return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }).join(','))
].join('\n');

fs.writeFileSync(out, csv);
console.log('Exportados', rows.length, 'tokens a', out);
