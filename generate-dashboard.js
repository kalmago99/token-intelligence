// Generate dashboard from index.json
const fs=require('fs');
const index=JSON.parse(fs.readFileSync('./index.json'));
const dash= {tokens: index };
fs.writeFileSync('./dashboard/dashboard.json', JSON.stringify(dash));
console.log('Dashboard generated');