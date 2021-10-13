let socket = io();

//Branch test 3

socket.on('yourId',function(data){
    myId = data
});

socket.on('playerUpdate', function(data){
    PLAYER_LIST = data;
})

socket.on('newPositions',function(data){
    let playerData = data.posPack
    if (playerData != []) {
        for(let i = 0 ; i < playerData.length; i++) {
            if (myId != playerData[i].id) {
                let player = PLAYER_LIST[playerData[i].id]
                player.x = playerData[i].x
                player.y = playerData[i].y
                player.dir = playerData[i].dir
                player.pressingUp = playerData[i].pressingUp
                player.pressingDown = playerData[i].pressingDown
                player.pressingLeft = playerData[i].pressingLeft
                player.pressingRight = playerData[i].pressingRight
                player.speed = playerData[i].speed
                player.acc = playerData[i].acc
                player.drowning = playerData[i].drowning
                player.scale = playerData[i].scale
            }
        }
    }
});

socket.on('NPCUpdate',function(data){
    NPC_LIST = data
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
        socket.emit('movement', PLAYER_LIST[myId])
        sendNewInfo = false
    }
}

function updateNPCs() {
    for (let i = 0; i < NPC_LIST.length; i++) {
        let NPC = NPC_LIST[i]
        switch(NPC.type) {
            case 0:
                //Ferry
                Ferry.update(NPC)
        }
    }
}

function drawNPCs() {
    for (let i = 0; i < NPC_LIST.length; i++) {
        let NPC = NPC_LIST[i]
        switch(NPC.type) {
            case 0:
                //Ferry
                Ferry.draw(NPC, ctx, offsetX, offsetY)
        }
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

function checkCollision() {
    let indexCol = trackSimpleCol.width * Math.floor(PLAYER_LIST[myId].y) + Math.floor(PLAYER_LIST[myId].x)
    //console.log(collisionDataArray[indexCol])
    if (collisionDataArray[indexCol] == '#99d9ea' && !PLAYER_LIST[myId].drowning) {
        let onFerry = false
        for (let i = 0; i < NPC_LIST.length; i++) {
            let NPC = NPC_LIST[i]
            let player = PLAYER_LIST[myId]
            if (NPC.type == 0 && player.x >= NPC.x && player.x <= (NPC.x + ferrySpr.width) && player.y >= NPC.y && player.y <= (NPC.y + ferrySpr.height)) {
                onFerry = true;
                player.x += Math.cos(NPC.dir) * NPC.spd;
                player.y += Math.sin(NPC.dir) * NPC.spd;
                console.log(onFerry)
            }
        }
        if (!onFerry) {
            PLAYER_LIST[myId].drowning = true;
            sendNewInfo = true;
        }
    }
}

function update() {
    setDeltaT()
    checkWindow()
    setOffset()
    checkKeyStates()
    updateKeyStates()
    sendInfo()
    //consoleLog()
    checkCollision()
    updateNPCs()
    updateCars()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'rgb(153, 217, 234)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(trackSimple, -offsetX, -offsetY);
    drawNPCs()
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