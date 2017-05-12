const model = require('../models');
const shortid = require('short-id');
require('dotenv').config();
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
      res.send({ massage: 'register success' });
    }).catch((err) => {
      res.send(err);
    });
  },
  fbLogin: (req, res) => {
    model.User.findOne({
      where: {
        username: req.body.username,
      }
    })
    .then((data) => {
      if (data) {
        const user = data;
        const token = jwt.sign({
          userid: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        }, process.env.RAHASIA, { expiresIn: 24 * 60 * 60 });
        const sentUser = {
          id: user.id,
          name: user.name,
          profilpicture: user.profil_picture_url
        };
        res.send({ sentUser, token });
      } else {
        model.User.create({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          role: 'user',
          profil_picture_url: req.body.profil_picture_url
        }).then((data2) => {
          const user = data2;
          const token = jwt.sign({
            userid: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          }, process.env.RAHASIA, { expiresIn: 24 * 60 * 60 });
          const sentUser = {
            id: user.id,
            name: user.name,
            profilpicture: user.profil_picture_url
          };
          res.send({ sentUser, token });
        });
      }
    });
  }
};
