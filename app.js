const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routers/api');

const app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());
app.use('/api', api);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server Jalan di port ${process.env.PORT}`);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.emit('from server', { massage: 'update' });
  socket.on('from client', () => {
    socket.broadcast.emit('from server', 'update' );
  });
});

module.exports = {
  server,
  app
};
