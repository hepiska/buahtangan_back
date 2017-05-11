'use strict';
let model = require('../models')
module.exports = {
  up: function (queryInterface, Sequelize) {
    return model.Category.find({}).then((category)=>{
      if (category===null) {
        return queryInterface.bulkInsert('Categories', [{
          name: 'food',
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:'snack',
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:'accecories',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
      }
    })


  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Categories', null, {});

  }
};
