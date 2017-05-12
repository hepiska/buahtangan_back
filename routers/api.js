const express = require('express');
require('dotenv').config();
const model = require('../models');
const ProductController = require('../controllers/products');
const UserController = require('../controllers/users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const router = express.Router();

passport.use(new LocalStrategy({
  session: false
},
    (username, password, done) => {
      model.User.findOne({
        where: {
          username: username
        }
      }).then((user) => {
        if (user) {
          if (user.password === crypto.createHmac('sha256', user.salt)
              .update(password).digest('hex')) {
            done(null, user);
          } else {
            done(null, false);
          }
        } else {
          done(null, false);
        }
      });
    }
));

router.get('/products/:city_name/:category', ProductController.views);
router.get('/featured/:city', ProductController.getFeaturedProduct);
router.post('/products', ProductController.createProduct);
router.delete('/products/:id', ProductController.delete);
router.put('/products/:id', ProductController.update);
router.post('/user/register', UserController.register);
router.post('/user/fblogin', UserController.fbLogin);
router.post('/login',passport.authenticate('local', { session: false }), (req, res) => {
  const user = res.req.user;
  const token = jwt.sign({
    userid: user.id,
    name: user.name,
    username: user.username,
    email: user.email
  }, process.env.RAHASIA, { expiresIn: 24 * 60 * 60 });
  const sentUser = { id: user.id, name: user.name, profilpicture: user.profil_picture_url }
  res.send({ sentUser, token });
});


module.exports = router;
