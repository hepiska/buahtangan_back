var chai = require('chai')
var chaiHttp = require('chai-http')
let app = require('../app')

var should = chai.should()
chai.use(chaiHttp)

let models = require('../models')
let serverHost = app;

describe ('register login', done => {
  it('should have response',done => {
chai.request(serverHost).post('/api/user/register')
.send({
  name: 'lalala',
  email: 'lalala@mail.com',
  phone: '0092109209120129',
  username: 'sumarsi',
  password: 'sumarsi',
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
  })
})
