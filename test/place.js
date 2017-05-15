const chai = require('chai');
const mocha = require('mocha');
const should =  chai.should();
const model = require('../models');
const chaiHttp = require('chai-http');
const server = require('../app.js').server;
chai.use(chaiHttp);
describe('get place', () => {
  it('success', (done) => {
    chai.request(server)
    .get('/api/place/jakarta')
    .send({})
    .end((err, res) => {
      if (err) {
        done()
      } else {
        res.should.have.status(200);
        res.body.length.should.not.equal(0)
        done()
      }
    })
  });
  it('error', (done) => {
    chai.request(server)
    .get('/api/place/jakarta')
    .send({})
    .end((err, res) => {
      if (err) {
        err.should.not.equal(null)
        done()
      } else {
        done()
      }
    })
  });
  it('wrong city', (done) => {
    chai.request(server)
    .get('/api/place/bandung')
    .send({})
    .end((err, res) => {
      if (err) {
        done()
      } else {
        res.should.have.status(200);
        res.body.massage.should.equal('city unavailibe')
        done()
      }
    })
  });
})
