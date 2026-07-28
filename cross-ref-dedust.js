// Cross-reference DeDust vs STON.fi index
const fs=require('fs');const path=require('path');
const index=JSON.parse(fs.readFileSync(path.join(__dirname,'index.json'),'utf8'));
const dedustJson=JSON.parse(fs.readFileSync(path.join(__dirname,'data','dedust-assets.json'),'utf8'));
const dedustSet=new Set(dedustJson.map(a=>a.symbol));
const cross=[],dedustOnly=[];
for (const s of dedustSet) {
    if (index[s]) cross.push(s); else dedustOnly.push(s);
}
console.log(`Cross: ${cross.length}, DeDust-only: ${deDustOnly.length}`);