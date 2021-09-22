import { carUpdate } from './car.js'
import { carDraw } from './car.js'

let socket = io();

socket.on('yourId',function(data){
    myId = data
});

socket.on('playerUpdate', function(data){
    PLAYER_LIST = data;
})

socket.on('newPositions',function(data){
    for(let i = 0 ; i < data.length; i++) {
        if (myId != data[i].id) {
            let player = PLAYER_LIST[data[i].id]
            player.x = data[i].x
            player.y = data[i].y
            player.dir = data[i].dir
            player.pressingUp = data[i].pressingUp
            player.pressingDown = data[i].pressingDown
            player.pressingLeft = data[i].pressingLeft
            player.pressingRight = data[i].pressingRight
            player.speed = data[i].speed
            player.ts = data[i].ts

            let timeSince = Math.floor((Date.now() - player.ts) / 20 )
            for (let i = 0; i < timeSince; i++) {
                carUpdate(player);
            }
        }
    }
});

socket.on('cheater',function(){
    alert("We don't want no cheatin' around here!")
})

function updateKeyStates() {
    if (Object.keys(PLAYER_LIST).length != 0) {
        PLAYER_LIST[myId].pressingUp = pressingUp;
        PLAYER_LIST[myId].pressingDown = pressingDown;
        PLAYER_LIST[myId].pressingLeft = pressingLeft;
        PLAYER_LIST[myId].pressingRight = pressingRight;
    }
}

function sendInfo() {
    if (sendNewInfo) {
        PLAYER_LIST[myId].ts = Date.now()
        socket.emit('movement', PLAYER_LIST[myId])
        sendNewInfo = false
    }
}

function updateCars() {
    for (let i in PLAYER_LIST) {
        let player = PLAYER_LIST[i]
        carUpdate(player);
    }
}

function drawCars() {
    for (let i in PLAYER_LIST) {
        let player = PLAYER_LIST[i]
        carDraw(player);
    }
}

function checkWindow() {
    if (wWIDTH != window.innerWidth || wHEIGHT != window.innerHeight) {
        wWIDTH = window.innerWidth
        wHEIGHT = window.innerHeight

        canvasFact = wHEIGHT / gameH

        if (gameW * canvasFact < wWIDTH) {
            canvas.width = wWIDTH
            canvasFact = wWIDTH / gameW
            canvas.height = gameH * canvasFact
        } else {
            canvas.height = wHEIGHT
            canvas.width = gameW * canvasFact
        }
        
        ctx.scale(canvasFact, canvasFact)
    }
}

function setOffset() {
    offsetX = PLAYER_LIST[myId].x - ((canvas.width / 2) / canvasFact)
    offsetY = PLAYER_LIST[myId].y - ((canvas.height / 2) / canvasFact)
}

function consoleLog() {
    let pack = []

    pack.push(sendNewInfo)

    socket.emit('touch',pack)
}

function update() {
    checkWindow()
    setOffset()
    checkKeyStates()
    updateKeyStates()
    sendInfo()
    //consoleLog()
    //let indexCol = trackSimpleCol.width * Math.floor(PLAYER_LIST[myId].y) + Math.floor(PLAYER_LIST[myId].x)
    //console.log(collisionDataArray[indexCol])
    updateCars()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(trackCool, -offsetX, -offsetY);
    drawCars()
}



setInterval(function(){
    update()
    draw()
},1000/50);