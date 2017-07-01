'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    address: DataTypes.STRING,
    lag: DataTypes.STRING,
    lat: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Location;
};
