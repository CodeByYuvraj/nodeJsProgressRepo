const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

let user = [];
app.use(express.static(__dirname));

io.on('connection', (socket) => {

    // console.log("a new user connected 😎😎:)");

    io.emit("msg", "a user joined 😎😎");
    // io.emit("msg", "a user joined 😎");
    // io.emit("msg", "a user joined ");
    // io.emit("msg", "a user ");

    socket.on('msg', (mes) => {
        socket.broadcast.emit("hello")
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('msg', "user gone")
    })

});



// on <<->> emit 

server.listen(process.env.PORT || 9000, () => console.log("listning on 😊 localhost:9000"));

