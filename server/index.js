require('dotenv').load();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('update', function(){
    console.log('database event');  
    io.emit('update');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.set('port', (process.env.PORT || 5000));  

// configure our server with all the middleware
require('./config/middleware.js')(app, require('express'));

http.listen(app.get('port'), function(){
  console.log('listening on *:5000');
});


// // load up .env as soon as possible
// require('dotenv').load();

// var app = require('./config/server.js');

// // listen
// app.listen(app.get('port'));