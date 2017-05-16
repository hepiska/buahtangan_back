const model = require('../models');
const mail = require('../helper/mail');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  views: (req, res) => {
    model.Transaction.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then((data) => {
      res.send(data);
    });
  },
  viewBuyer: (req, res) => {
    jwt.verify(req.body.token, process.env.RAHASIA, (err, decoded) => {
      if (err) {
        res.send(err)
      } else {
        const user = decoded;
        model.Transaction.findAll({
          where: {
            user_id: user.id
          }
        }).then((data) => {
          res.send(data)
        })
      }
    });
  },
  update: (req, res) => {
    model.Transaction.update({
      status: req.body.status
    },
      {
        where: {
          id: req.params.id
        }
      }).then((data) => {
        model.Transaction.findOne({
          where: {
            id: data
          }
        }).then((dataTran) => {
          model.User.find({
            where: {
              id: dataTran.user_id
            }
          }).then((dataUser) => {
            mail.sendTransactionStatus(dataUser.email,
            dataTran.transaction_id, dataTran.status);
          })
        })
        res.send({ massage: 'data updated' })
      });
  }
};
