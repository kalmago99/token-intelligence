// Process and normalize results
const fs=require('fs');
const index=JSON.parse(fs.readFileSync('./index.json'));
for (const k of Object.keys(index)) {
    if (!index[k].category) index[k].category = 'MESP';
    if (!index[k].price) index[k].price = null;
}
fs.writeFileSync('./index.json', JSON.stringify(index, null, 2));
console.log('Processed index');