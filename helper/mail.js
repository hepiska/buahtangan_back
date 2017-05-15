const AWS = require('aws-sdk');
const model = require('../models');
const cron = require('node-cron');
require('dotenv').config();

const fs = require('fs');

const longWeekendString = fs.readFileSync('./data/longweekend.json').toString();
const longWeekendJson = JSON.parse(longWeekendString);

AWS.config
.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECCRET });
AWS.config.update({ region: 'us-west-2' });

const ses = new AWS.SES();

module.exports = {
  sendTransactionSumaary: (recived_email, transactionId) => {
    model.sequelize.query(`select  products.name as name,count(products.name) as banyak, sum(CAST( products.price as INTEGER)) as sub_total
                            from public."Carts" carts left join public."Products" products on(products.id = carts.product_id )
                            where carts.transaction_id = '${transactionId}' group by name`
      , {
        type: model.sequelize.QueryTypes.SELECT
      }).then((products) => {
        // change data from db to string
        let sendData = products.map((product) => {
          return `nama product: ${product.name} jumlah : ${product.banyak} sub total: Rp${product.sub_total}`
        })
        let sendDataHtml = products.map((product) => {
          return `<tr>
                    <td style="border: 1px solid #000000;text-align: left;padding: 8px;">${product.name}</td>
                    <td style="border: 1px solid #000000;text-align: left;padding: 8px;">${product.banyak}</td>
                    <td style="border: 1px solid #000000;text-align: left;padding: 8px;">Rp${product.sub_total}</td>
                  </tr>`
        })
        sendDataHtml = sendDataHtml.join('\n');
        let total = products.reduce((acc, product) => {
          return acc + Number(product.sub_total);
        }, 0);
        total = `Total : Rp ${total}`
        sendData = [...sendData, total];
        sendData = sendData.join('\n');
        let to = [recived_email]

        const params = {
          Source: 'buahtanganmail@gmail.com',
          Destination: { ToAddresses: to },
          Message: {
            Subject: {
              Charset: 'UTF-8',
              Data: 'check out sumary'
            },
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: `<h3>Transaction id: ${transactionId}<h3> <br>
                        <table style="width:60%">
                        <tr style="background-color: #dddddd;">
                          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Name</th>
                          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Quantity</th>
                          <th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Sub Total </th>
                        </tr>
                        ${sendDataHtml}
                      </table>
                      <h3>${total}<h3>`
              },
              Text: {
                Data: sendData,
              }
            }
          }
        }
        ses.sendEmail(params, function(err, data) {
          if (err) {
            return (err)
          }
          return 'send email success'
        });
      }).catch((err) => {
        console.log(err);
      });
  },

  sendTransactionStatus : (recivedEmail, transactionId, status) => {
    let to = [recivedEmail];
    const params = {
      Source: 'buahtanganmail@gmail.com',
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Your Transaction Status'
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h2>Your Transaction with Id ${transactionId} Status is ${status}<h2>`
          }
        }
      }
    }
    ses.sendEmail(params, (err, data) => {
      if (err) {
        // console.log(err);
        return (err)
      }
      return 'send email success'
    });
  },
  sendPromo: (recivedEmail) => {
    let to = [recivedEmail];
    const params = {
      Source: 'buahtanganmail@gmail.com',
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Sudah siap Buat Liburan'
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<h2>Long weekend is comming <h2>
                    <h4>halo sahabat buah tangan long weekend sebentar lagi
                      pas jalan jalan yang dirumah nungguin loh jangan lupa bawain
                      oleh-oleh ya belinya di buahtangan agar liburan kamu tidak terganggu
                      <h4>`
          }
        }
      }
    };
    longWeekendJson.forEach((date) => {
      console.log(date);
      cron.schedule(`8 8 ${date.date} ${date.month} *`, (err, res) => {
        if (err) {
        } else {
          ses.sendEmail(params, (err, data) => {
            if (err) {
              // console.log(err);
              return (err)
            }
            return 'send email success'
          });
        }

      });

    })

  }
};
