const model = require('../models');

module.exports = {
  views: (req, res) => {
    let city = '';
    if (req.params.city_name === 'all') {
      city = '';
    } else {
      city = req.params.city_name;
      city = city.split('_');
      city = city.join(' ').toLowerCase();
    }

    let category = '';
    if (req.params.category.toLowerCase() === 'all') {
      category = '';
    } else {
      category = req.params.category.toLowerCase();
    }
    model.sequelize.query(`select products.id as id, products.name as name, products.image_url as image_url, products.desc as desc, cities.name as city_name, categories.name as category_name
          from public."Products" products left join public."Product_cities"  product_cities on(products.id=product_cities.product_id)
          left join public."Cities" cities on (product_cities.city_id=cities.id)
          left join public."Product_categories" product_categories on(product_categories.product_id=products.id)
          left join public."Categories" categories on (product_categories.category_id=categories.id)
          where cities.name ilike '%${city}%' and categories.name Ilike '%${category}%'`
      , {
        type: model.sequelize.QueryTypes.SELECT
      }).then((questions) => {
        res.send(questions);
      }).catch((err) => {
        res.send(err);
      });
  }
};
