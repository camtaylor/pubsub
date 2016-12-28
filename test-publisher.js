var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();
var prompt = require('prompt');
prompt.start()
function restart() {
 prompt.get(['message','src', 'color'], function (err, result) {
    publisher.publish("test", new Date());
    publisher.publish("test2", result.message);
    publisher.publish("src", result.src);
    publisher.publish("color", result.color);
    restart();
 });
}

restart();
