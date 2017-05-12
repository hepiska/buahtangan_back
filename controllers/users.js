const model = require('../models');
const shortid = require('short-id');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  register: (req, res) => {
    const salt = shortid.generate();
    model.User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      salt,
      role: req.body.role,
      profil_picture_url: req.body.profil_picture_url,
      username: req.body.username,
      password: crypto.createHmac('sha256', salt)
          .update(req.body.password).digest('hex')
    }).then(() => {
      res.send('register succes');
    }).catch((err) => {
      res.send(err);
    });
  }
};
