const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routers/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', api);

const server = app.listen(process.env.PORT, function () {
  console.log(`Server Jalan di port ${process.env.PORT}`);
});

module.exports = server;
