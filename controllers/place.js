const model = require('../models');

module.exports = {
  viewsByCity: (req, res) => {
    model.City.find({
      where: {
        name: {
          $iLike: `%${req.params.city_name}%`
        }
      }
    })
    .then((data) => {
      if (data ) {
        data.getPlaces()
        .then((dataPlaces) => {
          res.send(dataPlaces)
        })
      } else {
        res.send({ massage: 'city unavailibe' })
      }


    });
  }
}
