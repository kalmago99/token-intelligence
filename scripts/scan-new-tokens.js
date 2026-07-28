// Scan for new tokens not yet in the index
const fs=require('fs');const path=require('path');
const INDEX=JSON.parse(fs.readFileSync(path.join(__dirname,'..','index.json'),'utf8'));
const ASPECT=JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','stonfi-assets.json'),'utf8'));
const existingSymbols=new Set(Object.keys(INDEX));
const newAssets=(ASPECT.asset_list||[]).filter(a=>!existingSymbols.has(a.symbol));
newAssets.forEach(a=>console.log(`$a.symbol} - $a.display_name||a.name}`));