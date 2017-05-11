'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product_category = sequelize.define('Product_category', {
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product_category;
};