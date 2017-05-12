const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const model = require('../models');
const should =  chai.should();

chai.use(chaiHttp);
describe('api',()=>{
  it('get product',done => {
    chai.request(server)
    .get('/api/products/jakarta/food')
    .send({})
    .end((err,res)=>{
      res.should.have.status(200)
      res.body[0].should.have.property('id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('image_url');
      done()
    })
  });
  it('get transaction id', done => {
    chai.request(server)
    .get('/api/getTransactionNumber')
    .send({})
    .end((err,res) => {
      res.should.have.status(200);
      res.body.should.be.an('string');
    })
  })
})
