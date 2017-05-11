const fs = require('fs');

module.exports = {
  products: () => {
    let fileString = fs.readFileSync('./data/table_product.csv').toString();
    fileString = fileString.split('\n');
    const productsData = fileString.map(product => product.split(','));
    return productsData;
  },
  product_city: () => {
    let fileString = fs.readFileSync('./data/product_city.txt').toString();
    fileString = fileString.split('\n');
    const productsCityData = fileString.map(product => product.split(','));
    return productsCityData;
  },
  product_category: () => {
    let fileString = fs.readFileSync('./data/product_category.txt').toString();
    fileString = fileString.split('\n');
    const productsCategoryData = fileString.map(product => product.split(','));
    return productsCategoryData;
  },

};
