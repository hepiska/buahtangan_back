const AWS = require('aws-sdk')
const fs = require('fs');
require('dotenv').config();
AWS.config
.update({ accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_SECCRET });

module.exports = {
  upload: (req, res) => {
    const params = { Bucket: 'buahtangandata', Key: `${req.body.name}_${new Date()}.jpg`, Body: req.body.data };
    const s3 = new AWS.S3();
    s3.upload(params, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.send({ url: data.Location });
      }
    });
  }
};
