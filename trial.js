const fs = require('fs');

let data = fs.readFileSync('./data/longweekend.json').toString();
const dataPlaceJson = JSON.parse(data);

console.log(data);
