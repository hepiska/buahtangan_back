const AWS = require('aws-sdk')
const fs = require('fs');
require('dotenv').config();
const generateID = require('unique-id-generator');

AWS.config
.update({ accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_SECCRET });

module.exports = {
  upload: (req, res) => {
    console.log(req.body.data);
    const base64data = new Buffer(req.body.data, 'binary');
    const params = { Bucket: 'buahtangandata', Key: `${generateID({ prefix: `${req.body.name}` })}.jpg`, Body: base64data };
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
