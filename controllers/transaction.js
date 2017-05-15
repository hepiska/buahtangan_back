const model = require('../models');
const mail = require('../helper/mail');


module.exports = {
  views: (req, res) => {
    model.Transaction.findAll({})
    .then((data) => {
      res.send(data);
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
