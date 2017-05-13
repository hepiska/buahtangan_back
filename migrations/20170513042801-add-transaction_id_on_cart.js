'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Carts',
      'transaction_id',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Carts', 'transaction_id')
  }
};
