'use strict';
let model = require('../models')
let productsCityData = require('../data/readFile').product_city();
module.exports = {
    up: function(queryInterface, Sequelize) {
        return model.Product_city.find({}).then((Product_city) => {
            if (Product_city === null) {
                return new Promise(function(res, rej) {
                    let promises = [];
                    for (var i = 1; i < (productsCityData.length - 1); i++) {
                        console.log(productsCityData[i][1]);
                        promises.push(new Promise(function(resolve, reject) {
                            model.Product_city.create({
                                product_id: Number(productsCityData[i][1]),
                                city_id: Number(productsCityData[i][2])
                            });
                            if (promises.length != 0) {
                                resolve()
                            } else {
                                reject()
                            }
                        }))
                    }
                    Promise.all(promises).then(function() {
                        console.log('seed success');
                        res()
                    }).catch(function(err) {
                        console.log(err);
                        rej()
                    })
                })
            }
        })

    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Product', null, {});

    }
};
