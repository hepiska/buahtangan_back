const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const model = require('../models');
const should =  chai.should();

chai.use(chaiHttp);
