//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import { carUpdate } from './server/car.js'

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

let posPack = []

let io = new Server(serv);

io.sockets.on('connection', function(socket){
    socket.id = Math.random();

    let player = {}
    player.x = 100
    player.y = 100
    player.dir = 0
    player.id = socket.id

    player.pressingUp = false;
    player.pressingDown = false;
    player.pressingLeft = false;
    player.pressingRight = false;

    player.speed = 0;
    player.ts = Date.now()

    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[player.id] = player;

    console.log('Socket connected!');

    socket.emit('yourId', socket.id)
    emitAll('playerUpdate', PLAYER_LIST)

    socket.on('movement',function(data){
        if (data != null) {
            if (data.speed < 3.1) {
                console.log(data)
                let timeSince = Math.floor((data.ts - player.ts) / 20 )
                for (let i = 0; i < timeSince; i++) {
                    carUpdate(player);
                }
                //console.log(player.x - data.x)

                if (player.x - data.x < 20 && player.x - data.x > -20 && player.y - data.y < 20 && player.y - data.y > -20) {
                    player.x = data.x
                    player.y = data.y
                    player.dir = data.dir

                    player.pressingUp = data.pressingUp;
                    player.pressingDown = data.pressingDown;
                    player.pressingLeft = data.pressingLeft;
                    player.pressingRight = data.pressingRight;

                    player.speed = data.speed;
                    player.ts = data.ts;

                    posPack.push({
                        x:player.x,
                        y:player.y,
                        dir:player.dir,
                        id:player.id,
                        pressingUp:player.pressingUp,
                        pressingDown:player.pressingDown,
                        pressingLeft:player.pressingLeft,
                        pressingRight:player.pressingRight,
                        speed:player.speed,
                        ts:player.ts
                    });
                } else {
                    socket.emit('cheater');
                    console.log('We have a cheater over here. :(')
                }
            } else {
                socket.emit('cheater');
                console.log('We have a cheater over here. :(')
            }
        }
    })

    socket.on('touch',function(data){
        //console.log(data)
    })

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[player.id];
        emitAll('playerUpdate', PLAYER_LIST)
        console.log('Socket disconnected');
    });
});

function emitAll(msg, data) {
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit(msg, data)
    }
}

setInterval(function(){
    if (posPack != []) emitAll('newPositions', posPack)

    posPack = []
},1000/25);