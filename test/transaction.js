const chai = require('chai');
const mocha = require('mocha');
const should =  chai.should();
const model = require('../models');
const chaiHttp = require('chai-http');
const server = require('../app.js');

describe('get data', (done) => {
  it('success', (done) => {
    chai.request(server)
    .get('/api/Transaction')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.length.should.equal(1)
      done()
    });
  });
  it('success', (done) => {
    chai.request(server)
    .put('/api/Transaction/1')
    .send({
      status: 'delivered'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.massage.should.equal('data updated');
      done()
    });
  })
})
