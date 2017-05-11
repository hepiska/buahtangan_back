'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Cities', [{
        id:1,
        name: 'jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id:2,
        name:'yogyakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Cities', null, {});

  }
};
