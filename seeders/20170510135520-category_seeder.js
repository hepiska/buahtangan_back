'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Categories', [{
        name: 'food',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:'snack',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:'accecories',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Categories', null, {});

  }
};
