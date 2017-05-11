'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define('Cart', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cart;
};