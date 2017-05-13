// let data = require('./data/readFile');
//
// console.log(data.products());
const fs = require('fs');

const readFile = fs.readFileSync('./data/STR.jpg');
// const dataPlaceJson = JSON.parse(readFile);
const nBuffer = new Buffer(readFile, 'binary');
fs.writeFileSync('./data/buffer.txt', nBuffer, 'utf8');
console.log(nBuffer);
