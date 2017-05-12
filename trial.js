// let data = require('./data/readFile');
//
// console.log(data.products());
const fs = require('fs');

const readFile = fs.readFileSync('data/Yogyakarta.json').toString();
const dataPlaceJson = JSON.parse(readFile);
console.log(dataPlaceJson);

console.log(dataPlaceJson);
