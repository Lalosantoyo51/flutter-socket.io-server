const { REFUSED } = require('dns');
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');



//path publico 
const public_path = path.resolve(__dirname, 'public');


app.use(express.static(public_path));

server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log("servidor corriendo en puerto ", process.env.PORT);
});
