'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Transactions',
      'transaction_id',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Transactions', 'transaction_id')
  }
};
