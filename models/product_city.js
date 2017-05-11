'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product_city = sequelize.define('Product_city', {
    product_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product_city;
};
