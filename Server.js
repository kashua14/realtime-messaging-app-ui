var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
user= [];
connections = [];

server.listen(process.env.PORT || 3001);
console.log('Server running...');

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connect', function(socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1),
        console.log('Disconnected: %s sockets connected', connections.length)
    });

    //Send Message
    // socket.on('send message', function(data) {

    // }
});

