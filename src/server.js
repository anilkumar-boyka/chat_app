  console.log('hello')
    var app = require('http').createServer()
    var io = require('socket.io')(app);
    app.listen(8080);
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
        console.log(data);
        });
    });

    // var app = require('express')();
    // var server = require('http').Server(app);
    // var io = require('socket.io')(server);
    
    // var listening = server.listen(8080);
    // export default{listening};