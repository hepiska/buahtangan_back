'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'role',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn('Users', 'role')
  }
};
