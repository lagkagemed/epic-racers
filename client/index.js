let socket = io();

//Branch test 3

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
            player.acc = data[i].acc
            player.drowning = data[i].drowning
            player.scale = data[i].scale
        }
    }
});

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
        socket.emit('movement', PLAYER_LIST[myId])
        sendNewInfo = false
    }
}

function updateCars() {
    for (let i in PLAYER_LIST) {
        let player = PLAYER_LIST[i]
        if (player.scale <= 0) {
            player.scale = 1
            player.x = 50
            player.y = 50
            player.drowning = false
            player.speed = 0;
        }
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
    setDeltaT()
    checkWindow()
    setOffset()
    checkKeyStates()
    updateKeyStates()
    sendInfo()
    //consoleLog()
    let indexCol = trackSimpleCol.width * Math.floor(PLAYER_LIST[myId].y) + Math.floor(PLAYER_LIST[myId].x)
    console.log(collisionDataArray[indexCol])
    if (collisionDataArray[indexCol] == '#99d9ea' && !PLAYER_LIST[myId].drowning) {
        PLAYER_LIST[myId].drowning = true;
        sendNewInfo = true;
    }
    updateCars()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'rgb(153, 217, 234)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(trackSimple, -offsetX, -offsetY);
    drawCars()
}

function setDeltaT() {
    deltat = (t + performance.now()) / 20
    t = -1 * performance.now()
}

setInterval(function(){
    update()
    draw()
},1000/50);