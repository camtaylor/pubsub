var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Mustache = require('mustache');
var fs = require('fs');

subscriber.on("message", function(channel, message) {
  io.emit(channel, message);
});


app.get('*', function(req,res) {
 


  var baseHTML = fs.readFileSync('base.html', "utf8");

 
  var filePath = ("." + req.path + '/display.html').replace("//", "/"); 
  var html = fs.readFileSync(filePath, "utf8");
  var template = Mustache.parse(html);
  var channels = template.filter(function(v) { return v[0] === 'name' || v[0] === '#' || v[0] === '&' }).map(function(v) { return v[1]; });
  
  // Subscribe to all channels in list
  for (var i = 0; i < channels.length; i++){
    subscriber.subscribe(channels[i]);
  }
 

  view = {
    "template" : html,
    "channels": channels
  };
  res.send(Mustache.render(baseHTML, view));
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(8080);
