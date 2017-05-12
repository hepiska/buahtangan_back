const fs = require('fs');

const readFile = fs.readFileSync('data/yogyakarta.json').toString();
const dataPlaceJson = JSON.parse(readFile);
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Places', dataPlaceJson);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Places', null, {});

  }
};
