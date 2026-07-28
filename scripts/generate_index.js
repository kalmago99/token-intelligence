// Generate clean token index from STON.fi assets JSON
const fs=require('fs');const path=require('path');
const [,,dataDir,indexFile]=process.argv;
const assets=JSON.parse(fs.readFileSync(path.join(dataDir,'stonfi-assets.json'),'utf8'));
const indexObj={};
for (const a of (assets.asset_list||[])) {
    indexObj[a.symbol]={address:a.contract_address||'', symbol:a.symbol, name:a.display_name||a.name||''};
}
fs.writeFileSync(indexFile,JSON.stringify(indexObj,null,2));