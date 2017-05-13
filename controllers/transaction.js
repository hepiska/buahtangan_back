const model = require('../models');

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
      }).then(() => {
        res.send({ massage: 'data updated' })
      });
  }
};
