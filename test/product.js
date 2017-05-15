const chai = require('chai');
const mocha = require('mocha');
const should =  chai.should();
const model = require('../models');
const chaiHttp = require('chai-http');
const server = require('../app.js').server;
const productController = require('../controllers/products')
chai.use(chaiHttp);
describe('Product', () => {

  it('sucsess createProduct', (done) => {
    chai.request(server)
    .post('/api/products')
    .send({
      name: 'bakpao',
      image_url: 'lalalala',
      desc: 'matap dan enak',
      price: '20000',
      featured: true,
      category: 'food',
      city: 'jakarta',
    })
    .end((err,res) => {
      res.should.have.status(200);
      done()
    });
  });
  it('delete product', (done) => {
    chai.request(server)
    .delete('/api/products/113')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      done()
    });
  });
  it('update product', (done) => {
    chai.request(server)
    .put('/api/products/20')
    .send({
      desc: 'matap gan'
    })
    .end((err, res) => {
      res.should.have.status(200);
       res.body.massage.should.to.equal('data updated');
      done()
    });
  });
  it('get product', (done) => {
    chai.request(server)
    .get('/api/products/jakarta/food')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('price');
      res.body[0].should.have.property('city_name');
      done()
    });
  });
  it('get product fail', (done) => {
    chai.request(server)
    .get('/api/products/jakarta/acces')
    .send({
    })
    .end((err, res) => {
      res.body.length.should.equal(0)
      done()
    });
  });

  afterEach((done) => {
    model.Product.destroy({
      where: {
        id: {
          $gt: 21
        }
      }
    });
    model.Product_category.destroy({
      where: {
        id: {
          $gt: 41
        }
      }
    });
    model.Product_city.destroy({
      where: {
        id: {
          $gt: 64
        }
      }
    })
    done();
  });
})

describe('featured product', () => {
  it('succes get ', (done) => {
    chai.request(server)
    .get('/api/featured/jakarta')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body[0].should.have.property('name')
      res.body[0].should.have.property('price')
      res.body[0].should.have.property('image_url')
      done()
    });
  });
  it('succes get ', (done) => {
    chai.request(server)
    .get('/api/featured/bandung')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.length.should.equal(0)
      done()
    });
  })
  it('succes wronng url ', (done) => {
    chai.request(server)
    .get('/api/featured/bandung/sa')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(404);
      done()
    });
  })
})
