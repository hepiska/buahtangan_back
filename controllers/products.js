const model = require('../models');

module.exports = {
  viewByCityCategory: (req, res) => {
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
    model.sequelize.query(`select products.id as id, products.name as name,products.price as price, products.image_url as image_url, products.desc as desc, cities.name as city_name, categories.name as category_name
          from public."Products" products left join public."Product_cities"  product_cities on(products.id=product_cities.product_id)
          left join public."Cities" cities on (product_cities.city_id=cities.id)
          left join public."Product_categories" product_categories on(product_categories.product_id=products.id)
          left join public."Categories" categories on (product_categories.category_id=categories.id)
          where cities.name ilike '%${city}%' and categories.name Ilike '%${category}%'`
      , {
        type: model.sequelize.QueryTypes.SELECT
      }).then((products) => {
        res.send(products);
      }).catch((err) => {
        res.send(err);
      });
  },
  getFeaturedProduct: (req, res) => {
    let city = '';
    if (req.params.city === 'all') {
      city = '';
    } else {
      city = req.params.city_name;
      city = city.split('_');
      city = city.join(' ').toLowerCase();
    }
    model.sequelize.query(`select DISTINCT products.id as id, products.name as name, products.price as price, products.image_url as image_url, products.desc as desc, cities.name as city_name, products.featured as featured
          from public."Products" products left join public."Product_cities"  product_cities on(products.id=product_cities.product_id)
          left join public."Cities" cities on (product_cities.city_id=cities.id)
          where cities.name ilike '%${city}%' and products.featured=true`
      , {
        type: model.sequelize.QueryTypes.SELECT
      }).then((questions) => {
        res.send(questions)
      }).catch((err) => { res.send(err); });
  },
  createProduct: (req, res) => {
    model.Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      desc: req.body.desc,
      rating: 0,
      price: req.body.price,
      featured: req.body.featured
    }).then((dataproduct) => {
      model.Category.findOne({
        where: { name: req.body.category }
      }).then((datacategory) => {
        model.Product_category.create({
          product_id: dataproduct.id,
          category_id: datacategory.id
        });
      });
      model.City.findOne({
        where:
        { name: req.body.city }
      }).then((dataCity) => {
        model.Product_city.create({
          product_id: dataproduct.id,
          city_id: dataCity.id
        }).then(() => {
          res.send({ massage:'input data sucsess' })
        });
      });
    }).catch((err) => {
      res.send(err);
    });
  },
  delete: (req, res) => {
    model.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then((dataproduct) => {
      model.Product_city.destroy({
        where: {
          product_id: req.params.id
        }
      }).then(() => {
        model.Product_category.destroy({
          where: {
            product_id: req.params.id
          }
        }).then(() => {
          res.send('data deleted');
        });
      });
    });
  },
  update: (req, res) => {
    model.Product.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((data) => {
      model.Product.update({
        name: req.body.name || data.name,
        image_url: req.body.image_url || data.image_url,
        featured: req.body.featured || data.featured,
        desc: req.body.desc || data.desc
      }, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        const output = { massage: 'data updated' };
        res.send(output);
      });
    });
  }
};
