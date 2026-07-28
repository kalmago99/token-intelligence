// Fetch holder counts from tonapi.io
const fs=require('fs');const path=require('path');
const INDEX=JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','index.json'),'utf8'));
const PRIORITY=['STON','NOT','REDO','GEMSTON','MAJOR',
'STORM','JETTON','CHERRY','UTYA','DOGS','CATI','PLANE','ANON','TPET','TONG','GRAM',
'USD®','tsTON','RECA','REGI'];
async function fetchHolders(address) {
    const url=`https://tonapi.io/v2/jettons/${encodeURIComponent(address)}/holders?limit=1`;
    try {
        const resp = await fetch(url);
        if (resp.status === 200) {
            const data = await resp.json();
            return data.total_rate;
        }
        return 'N/A';
    } catch { return 'ERROR'; }
}