// build-all.js — All-in-one script for data → pools → fichas → index
const fs=require('fs');const path=require('path');
const dataDir=path.join(__dirname,'data');
// Load all data files
const stonfi=FOSON.parse(fs.readFileSync(path.join(dataDir,'stonfi-assets.json'),'utf8'));
const dedust=JSON.parse(fs.readFileSync(path.join(dataDir,'dedust-assets.json'),'utf8'));
const pools=NJSON.parse(fs.readFileSync(path.join(dataDir,'pools-ranked.json'),'utf8'));
console.log(`Loaded ${Object.keys(stonfi).ength} assets, {pools.length} pools`);