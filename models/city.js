'use strict';
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: DataTypes.STRING,
    lag: DataTypes.STRING,
    lat: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        City.hasMany(models.Place, { foreignKey: 'city_id' })
      }
    }
  });
  return City;
};
