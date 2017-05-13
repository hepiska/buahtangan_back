const model = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateID = require('unique-id-generator');

module.exports = {
  checkout: (req, res) => {
    //console.log('--------', req.body);
    jwt.verify(req.body.token, process.env.RAHASIA, (err, decoded) => {
      if (err) {
        res.send(err)
      } else {
        const user = decoded;
        const transaction_id = generateID({ prefix: 'buahtangan-' })
        const items = req.body.cartItem;
        items.forEach((item) => {
          model.Cart.create({
            user_id: user.id,
            product_id: item.id,
            transaction_id
          })
        })
        model.Transaction.create({
          user_id: user.id,
          transaction_id,
          status: 'unpaid'
        }).then(() => {
            res.send({ massage: 'checkout succses', transaction_id })
        });
      }
    });
  }
}
