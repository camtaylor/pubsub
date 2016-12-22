var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

subscriber.on("message", function(channel, message) {
  console.log(message);
  io.emit(channel, message);
});

//Subscribe to proper channels
// TODO automatically subscribe to correct channels
subscriber.subscribe("test");
subscriber.subscribe("test2");

app.get('/', function(req,res) {
  res.sendfile('./public/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(8080);
