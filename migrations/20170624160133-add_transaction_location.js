'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Transactions',
      'location_id',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Transactions', 'location_id')
  }
};
