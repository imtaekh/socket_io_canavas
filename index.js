var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  io.emit('user',{message:"user connected"});
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('canvas clicked', function(data){
    io.emit('canvas clicked', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
