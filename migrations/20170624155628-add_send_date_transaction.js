'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Transactions',
      'send_date',
       Sequelize.DATE
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Transactions', 'send_date')
  }
};
