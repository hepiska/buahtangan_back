'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adminCode1: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      geonameId: {
        type: Sequelize.INTEGER
      },
      toponymName: {
        type: Sequelize.STRING
      },
      countryId: {
        type: Sequelize.STRING
      },
      fcl: {
        type: Sequelize.STRING
      },
      population: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      fclName: {
        type: Sequelize.STRING
      },
      countryName: {
        type: Sequelize.STRING
      },
      fcodeName: {
        type: Sequelize.STRING
      },
      adminName1: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      fcode: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Places');
  }
};
