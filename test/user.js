var chai = require('chai')
var chaiHttp = require('chai-http')
let app = require('../app').server

var should = chai.should()
chai.use(chaiHttp)

let model = require('../models')
let serverHost = app;

describe ('register login', () => {
  it('should have failed', (done) => {
    chai.request(serverHost).post('/api/register')
    .send({
      name: 'lalala',
      email: 'lalala@mail.com',
      phone: '0092109209120129',
      username: 'hepiska',
      password: 'hepiska',
      role: 'user',
      profil_picture_url: 'mantap'
    })
    .end((err, res) => {
      if (err) {
        done(err)
      } else {
        res.should.have.status(200);
        res.body.message.should.to.equal('Validation error: already taken')
        done()
      }
    });
  });


  it('should have succes', (done) => {
    chai.request(serverHost).post('/api/register')
    .send({
      name: 'lalala',
      email: 'lalala@mail.com',
      phone: '0092109209120129',
      username: 'sumarno',
      password: 'sumarno',
      role: 'user',
      profil_picture_url: 'mantap'
    })
    .end((err, res) => {
      if (err) {
        done(err)
      } else {
        res.should.have.status(200);
        res.body.massage.should.to.equal('register success')
        done()
      }
    });
  });

  afterEach((done) => {
    model.User.destroy({
      where: {
        id: {
          $gt: 15
        }
      }
    }).then(() => {
      done()
    });
  })
})

describe('login fb', () => {
  it('already have account', () => {
    chai.request(serverHost).post('/api/fblogin')
    .send({
      name: 'lalala',
      email: 'lalala@mail.com',
      phone: '0092109209120129',
      username: 'hepiska',
      profil_picture_url: 'mantap'
    })
    .end((err, res) => {
      if (err) {
        done(err)
      } else {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.should.have.property('sendUser');
        done()
      }
      done();
    });
  });

  it('dont have account', () => {
    chai.request(serverHost).post('/api/fblogin')
    .send({
      name: 'sumarni',
      email: 'sumarni@mail.com',
      phone: '0092109209120129',
      username: 'sumarni',
      profil_picture_url: 'sumarni cantik'
    })
    .end((err, res) => {
      if (err) {
        done();
      } else {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.should.have.property('sendUser');
        done();
      }
      done();
    });
  })

})
