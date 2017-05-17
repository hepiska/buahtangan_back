const chai = require('chai');
const mocha = require('mocha');
const should =  chai.should();
const model = require('../models');
const chaiHttp = require('chai-http');
const server = require('../app.js').server;

describe('checkout', () => {
  const cartItem = [
    { id: 1, name: 'bakpau' },
    { id: 2, name: 'bakpia' },
    { id: 3, name: 'bakpia' }
  ];
  it('success', (done) => {
    chai.request(server).post('/api/fblogin')
    .send({
      name: 'lalala',
      email: 'lalala@mail.com',
      phone: '0092109209120129',
      username: 'hepiska',
      profil_picture_url: 'mantap'
    })
    .end((err, res) => {
      if (err) {
      } else {
        let token = res.body.token
        chai.request(server).post('/api/checkout')
        .send({
          token,
          cartItem
        }).end((errcheckout, rescheckout) => {
          if (errcheckout) {
          } else {
            rescheckout.body.should.have.property('massage');
            rescheckout.body.data.should.have.property('transaction_id')
          }
        })
      }
    });

    done()
  });

  it('empey cart', (done) => {
    chai.request(server).post('/api/fblogin')
    .send({
      name: 'lalala',
      email: 'lalala@mail.com',
      phone: '0092109209120129',
      username: 'hepiska',
      profil_picture_url: 'mantap'
    })
    .end((err, res) => {
      if (err) {
      } else {
        let token = res.body.token
        //console.log(token);
        chai.request(server).post('/api/checkout')
        .send({
          token,
          cartItem:[]
        }).end((errcheckout, rescheckout) => {
          if (errcheckout) {
          } else {
            rescheckout.body.should.have.property('massage');
            rescheckout.body.massage.should.equal('cant checkout empety cart')
          }
        })
      }
    });
    done()
  });

  it('no token ', (done) => {
    chai.request(server).post('/api/checkout')
    .send({
      token:'',
      cartItem
    }).end((errcheckout, rescheckout) => {
      if (errcheckout) {
        done()
      } else {
        rescheckout.body.message.should.equal('jwt must be provided');
        done();
      }
    })
  });
  it('false token ', (done) => {
    chai.request(server).post('/api/checkout')
    .send({
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkcXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWUiOiJlZ28xIiwidXNlcm5hbWUiOiJoZXBpc2thIiwiZW1haWwiOiJoZXBpc2thQG1haWwuY29tIiwiaWF0IjoxNDk0NTg3NDg3LCJleHAiOjE0OTQ2NzM4ODd9.BFYu20KhMIr8uaKdIkE7sNJ04Pca-TDCXSuvc3TYBkk',
      cartItem
    }).end((errcheckout, rescheckout) => {
      if (errcheckout) {
        done()
      } else {
        rescheckout.body.message.should.equal('invalid token');
        done();
      }
    })
  });
  afterEach((done) => {
    model.Cart.destroy({
      where: {
        id: {
          $gt: 0
        }
      }
    }).then(() => {
      model.Transaction.destroy({
        where: {
          id: {
            $gt: 1
          }
        }
      }).then(() => {
      })
    });
    done()
  });
});
