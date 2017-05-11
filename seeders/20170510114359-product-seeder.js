'use strict';
let model= require('../models')
let productsData = require('../data/readFile').products();
module.exports = {
  up: function (queryInterface, Sequelize) {
   return model.Product.find({}).then((products) =>{
    if (products===null) {
      return new Promise(function(res,rej){
        let promises=[];
        for (var i = 1; i < (productsData.length - 1); i++) {
          promises.push(
            new Promise(function(resolve,reject){
              model.Product.create({
                id:productsData[i][0],
                name:productsData[i][1],
                image_url:productsData[i][2],
                price:productsData[i][3],
                desc:productsData[i][4],
                rating: 0,
                featured: productsData[i][6]
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
    }
  })
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Product', null, {});

  }
};
