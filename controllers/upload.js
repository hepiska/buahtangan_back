const AWS = require('aws-sdk')

require('dotenv').config();
const generateID = require('unique-id-generator');

AWS.config
.update({ accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_SECCRET });

module.exports = {
  upload: (req, res) => {
    let data1 = req.body.data.replace(/^data:image\/\w+;base64,/, '')
    const base64data = new Buffer(data1, 'base64');
    const params = { Bucket: 'buahtangandata',
      Key: `${generateID({ prefix: `${req.body.name}` })}`,
      Body: base64data
    };
    const s3 = new AWS.S3();
    s3.upload(params, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ url: data.Location });
      }
    });
  }
};
