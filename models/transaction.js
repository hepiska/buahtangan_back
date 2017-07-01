'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    user_id: DataTypes.INTEGER,
    transaction_id:DataTypes.STRING,
    status: DataTypes.STRING,
    send_date: DataTypes.DATE,
    location_id:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transaction;
};
