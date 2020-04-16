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
         io.sockets.emit('socket_id',socket.id)
         //personal_msg
        //  socket.on('join',function(data){
            //  console.log('rcvd id is'+data.username)
             socket.on('join', function (data) {    
                // socket.join(data.username);
                console.log("selected username is"+data.username)
                io.to(data.username).emit('name_selected_for_personal_msg', data);
              });
            //   })

              //personal_msg_received
              socket.on('personal_message',function(data){
                console.log('rcvd msg is'+data.message)
                console.log("and socked is"+data.Socketid)
                // socket.on('join', function (data) {    
                //    socket.join(data.personal_msg_reciever);
                   io.to(data.Socketid).emit('recieved_personal_msg', data);
                //  });
                });  


        // socket.broadcast.to('RA_74RxSr8LGdQemAAAB').emit( 'send_msg', 'hello' );
        // console.log("client count is")
        console.log(socket.server.engine.clientsCount)
        io.sockets.emit('client_info',socket.server.engine.clientsCount)
        socket.on('chat_name',function(data){
            // console.log(data)
            io.sockets.emit('chat_name',data);
        })
        socket.on('chat_message',function(data){
            
            io.sockets.emit('chat_message',data);
            // io.sockets.emit('client_info',socket.server.engine.clientsCount)
            
        })
        socket.on('typing',function(data)
        {
           socket.broadcast.emit('typing',data)
        })
        // socket.on('online_userName',function(data)
        // {
        // console.log('user online data is')
        // console.log(data)
        //    socket.broadcast.emit('online_userName',data)
        // })
    })

    
  
    

