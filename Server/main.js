var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [];
var port = process.env.PORT||5000;

app.use(express.static('Public'));

app.get('/hello',function(rep,res){
    res.status(200).send("hola mundo");
});

io.on('connection',function(socket){
    //console.log('nueva conexion socket');
    socket.emit('messages',messages);

    socket.on('new-message',function(data){
        messages.push(data);
        if(messages.length >5){
            messages.shift();
        }

        io.sockets.emit('messages',messages);
    });
});

server.listen(port,function(){
    console.log("server corriendo");
});

