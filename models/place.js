'use strict';
module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    adminCode1: DataTypes.STRING,
    lng: DataTypes.STRING,
    geonameId: DataTypes.INTEGER,
    toponymName: DataTypes.STRING,
    countryId: DataTypes.STRING,
    fcl: DataTypes.STRING,
    population: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    name: DataTypes.STRING,
    fclName: DataTypes.STRING,
    countryName: DataTypes.STRING,
    fcodeName: DataTypes.STRING,
    adminName1: DataTypes.STRING,
    lat: DataTypes.STRING,
    fcode: DataTypes.STRING,
    city_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Place.belongsTo(models.City, { foreignKey: 'city_id' });
      }
    }
  });
  return Place;
};
