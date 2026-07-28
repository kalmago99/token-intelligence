// Fetch total supply from tonapi.io
const fs=require('fs');
const index=JSON.parse(fs.readFileSync('./index.json'));
async function fetchSupply(a) {
    try {
        const r = await fetch(`https://tonapi.io/v2/jettons/${e~ncodeURIComponent(a)}`);
        if (r.ok) return (await r.json()).total_supply;
    } catch {}
    return null;
}
for (const s of ['STON','NOT','REDO']) {
    if (index[s]?.address) {
        const supply= await fetchSupply(index[s].address);
        if (supply) console.log(`${s}: ${supply}`);
    }
}
