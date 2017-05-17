const chai = require('chai');
const mocha = require('mocha');
const should =  chai.should();
const model = require('../models');
const chaiHttp = require('chai-http');
const server = require('../app.js').server;

describe('get data', (done) => {
  it('success', (done) => {
    chai.request(server)
    .get('/api/Transaction')
    .send({
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.length.should.equal(1)
    });
      done()
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
    });
    done()
  });
})

describe('get user transaction', () => {
  it('success', (done) => {
    chai.request(server)
    .post('/api/login')
    .send({
      username: 'hepiska',
      password: 'hepiska'
    }).end((err, res) => {
      if (err) {
        console.log(err);
        done()
      } else {
        chai.request(server)
        .post('/api/transactionUser')
        .send({
          token: res.body.token
        }).end((errtran, restran) => {
          if (errtran) {
            console.log(err);
          } else {
            restran.body[0].should.have.property('transaction_id');
            restran.body[0].should.have.property('user_id');
            restran.body[0].should.have.property('status');
          }
        })
      }
    })
  done()
  })

})
