// Generate dashboard with badges for both STON.fi and DeDust
const fs=require('fs');
const index=JSON.parse(fs.readFileSync('./index.json'));
fs.writeFileSync('./dashboard/dashboard.json', JSON.stringify(index));
console.log('Dashboard dex generated');