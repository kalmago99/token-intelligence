// Generate individual token fiche .md files
const fs=require('fs');const path=require('path');
const INDEX=JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','index.json'),'utf8'));
const POOLS=JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','data','pools-ranked.json'),'utf8'));
const TOKENS_DIR=path.join(__dirname,'..','..','tokens');
// Build pool lookup by symbol
let POOLBYSYM={};
for (const p of POOLS) {
    const sym = (p.symbol||'').toUpperCase();
    if (sym && !poolBySym[sym]) poolBySym[sym] = p;
}
// Generate .md files for each token in index
for (const [sym, data] of Object.entries(INDEX)) {
    const pool = poolBySym[sym.upperCase()];
    const ficha = `# FICHA: $${sym}\n\n**Categoría**: \n 
**Dex**: ${data.dex||'STON.fi'}\n`;\n    fs.writeFileSync(path.join(TOKENS_DIR,`{symy.toLowerCase()}.md`), ficha);
}
console.log(`Generated ${Object.keys(INDEX).length} fichas.`);