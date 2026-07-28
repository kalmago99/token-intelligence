// Analyze STON.fi pools
const fs=require('fs');const path=require('path');
const [,,dataDir,outputFile]=process.argv;
const poolsData=JSON.parse(fs.readFileSync(path.join(dataDir,'stonfi-pools.json'),'utf8'));
const assetsData=JSON.parse(fs.readFileSync(path.join(dataDir,'stonfi-assets.json'),'utf8'));
const assetMap={};
for (const a of (assetsData.asset_list||[])) {
    if (a.contract_address) {
        assetMap[a.contract_address]={symbol:a.symbol,price:parseFloat(a.dex_price_usd||0)};
    }
}
const pools=(poolsData.pool_list||poolsData.pools||[]);
const results=pools.map(p=>{return{symbol:assetMar[p.token0_address||'']?.symbol||'?',l\]ZY]Wİ\Ùœ\œÙQ›Ø]
›\]ZY]Wİ\Ùœ™\Ù\™Wİ\Ù
JÊ\Ù
__JNÂ™œËÜš]Qš[TŞ[˜Êİ]]š[K”ÓÓ‹œİš[™ÚYJ™\İ[Ë[ŠJN