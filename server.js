var port=3000;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('client.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  io.emit('user',{message:"user connected"});

  socket.on('draw_client', function(data){
    io.emit('draw_server', data);
  });
});

http.listen(port, function(){
  console.log('listening on http://127.0.0.1:'+port+'/');
});
