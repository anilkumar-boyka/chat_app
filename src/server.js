// console.log('hello')
// var http = require('http');
// var app = http.createServer();
// var io = require('socket.io')(app);
// io.on('connection', function (socket) {
//     socket.emit('success', {message: 'Server Accecpting Connections'});
//     socket.on('my other event', function (data) {
//     console.log(data);
//     });
// });
// app.listen(8080);
// console.log('Server listening on 8080');

    var socket = require('socket.io')
    var express = require('express');
    var app = express();
    var server = app.listen(8080,function(){
        console.log("listening on port 8080");
    })

    var io = socket(server);
    io.on('connection',function(socket){
        console.log("server socket connection made");
        console.log(socket.id)
        console.log("client count is")
        console.log(socket.server.engine.clientsCount)
        io.sockets.emit('client_info',socket.server.engine.clientsCount)
        io.sockets.emit('socket_id',socket.id)
        socket.on('chat_name',function(data){
            io.sockets.emit('chat_name',data);
        })
        socket.on('chat_message',function(data){
            
            io.sockets.emit('chat_message',data);
            // io.sockets.emit('client_info',socket.server.engine.clientsCount)
            
        })
    })

    
  
    

