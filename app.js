//express setup, Dette er en test! Dette er test 2!
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let Ferry = require('./client/ferry.cjs');

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
let NPC_LIST = {}
NPC_LIST.FERRIES = []

NPC_LIST.FERRIES.push(Ferry.new(360,80,[{x:500,y:200},{x:360,y:80}], 200, 1, NPC_LIST.FERRIES.length))

let dataPack = {}
dataPack.posPack = []
dataPack.ferryPack = []

let io = new Server(serv);

io.sockets.on('connection', function(socket){
    socket.id = Math.random();

    let player = {}
    player.x = 50
    player.y = 50
    player.dir = 0
    player.id = socket.id

    player.pressingUp = false;
    player.pressingDown = false;
    player.pressingLeft = false;
    player.pressingRight = false;

    player.speed = 0;
    player.acc = 0;

    player.drowning = false
    player.scale = 1

    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[player.id] = player;

    console.log('Socket connected!');

    socket.emit('yourId', socket.id)
    emitAll('playerUpdate', PLAYER_LIST)
    socket.emit('NPCUpdate', NPC_LIST)

    socket.on('movement',function(data){
        if (data != null) {
            console.log(data)
            player.x = data.x
            player.y = data.y
            player.dir = data.dir

            player.pressingUp = data.pressingUp;
            player.pressingDown = data.pressingDown;
            player.pressingLeft = data.pressingLeft;
            player.pressingRight = data.pressingRight;

            player.speed = data.speed;
            player.acc = data.acc;
            player.drowning = data.drowning
            player.scale = data.scale

            dataPack.posPack.push({
                x:player.x,
                y:player.y,
                dir:player.dir,
                id:player.id,
                pressingUp:player.pressingUp,
                pressingDown:player.pressingDown,
                pressingLeft:player.pressingLeft,
                pressingRight:player.pressingRight,
                speed:player.speed,
                acc:player.acc,
                drowning:player.drowning,
                scale:player.scale
            });
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

    socket.on('checkPointActiveIndex',function(data){
        emitAll('checkPointActiveIndex', data);
    });
});

function emitAll(msg, data) {
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit(msg, data)
    }
}

setInterval(function(){
    for (let i = 0; i < NPC_LIST.FERRIES.length; i++) {
        let ferry = NPC_LIST.FERRIES[i]
        Ferry.update(ferry, true, dataPack.ferryPack) // TODO BB 2021-10-16. Er det med vilje denne køres to gange?
        Ferry.update(ferry, true, dataPack.ferryPack)
    }
    let dataToSend = false

    if (dataPack.posPack != []) dataToSend = true
    if (dataPack.ferryPack != []) dataToSend = true
    if (dataToSend) emitAll('newPositions', dataPack)

    dataPack.posPack = []
    dataPack.ferryPack = []
},1000/25);