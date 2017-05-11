'use strict';
let model= require('../models')
let productsCategoryData = require('../data/readFile').product_category();
console.log(productsCategoryData);
module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise(function(res,rej){
      let promises=[];
      for (var i = 1; i < (productsCategoryData.length - 1); i++) {
        promises.push(
          new Promise(function(resolve,reject){
            model.Product_category.create({
              product_id:productsCategoryData[i][1],
              category_id:productsCategoryData[i][2],
            });
            if (promises.length!=0) {
              resolve()
            } else {
              reject()
            }
          })
        )
      }
      Promise.all(promises).then(function(){
        console.log('seed success');
        res()
      }).catch(function(err){
        console.log(err);
        rej()
      })

    })
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Product', null, {});

  }
};
