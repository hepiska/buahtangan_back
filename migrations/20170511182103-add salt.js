'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'salt',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Users', 'salt')
  }
};
