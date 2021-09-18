//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
let serv = http.Server(app);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

let SOCKET_LIST = {}
let PLAYER_LIST = {}

let io = new Server(serv);

io.sockets.on('connection', function(socket){
    socket.id = Math.random();

    let player = {}
    player.x = 100
    player.y = 100
    player.dir = 0
    player.id = socket.id

    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[player.id] = player;

    console.log('Socket connected!');

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[player.id];
        console.log('Socket disconnected');
    });
});