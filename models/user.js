'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    profil_picture_url: DataTypes.STRING,
    username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isuniq: (value, next) => {
            User.find({
              where: {
                username: value
              }
            }).then((user) => {
              if (user) {
                next('already taken')
              } else {
                next()
              }
            })
          }
        }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
