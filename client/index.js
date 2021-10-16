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
    let ferryData = data.ferryPack
    if (ferryData != []) {
        for (let i = 0; i < ferryData.length; i++) {
            let newFerry = ferryData[i]
            let oldFerry = NPC_LIST.FERRIES[newFerry.id]

            oldFerry.x = newFerry.x
            oldFerry.y = newFerry.y
            oldFerry.dest = newFerry.dest
            oldFerry.waitCount = newFerry.wC
        }
    }
});

socket.on('NPCUpdate',function(data){
    NPC_LIST = data
})

socket.on('checkPointActiveIndex',function(data){
    for (let i = 0; i < checkPoints.length; i++) {
        checkPoints[i].active = false;
    }
    checkPoints[data].active = true;
    checkPointActiveIndex = data;
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

function drawCheckPoints() {
    for (let i = 0; i < checkPoints.length; i++) {
        checkPoints[i].draw(offsetX, offsetY);
    }
}

function updateNPCs() {
    if (typeof NPC_LIST.FERRIES !== 'undefined') {
        for (let i = 0; i < NPC_LIST.FERRIES.length; i++) {
            let NPC = NPC_LIST.FERRIES[i]
                Ferry.update(NPC, false, [])
        }
    }
}

function drawNPCs() {
    if (typeof NPC_LIST.FERRIES !== 'undefined') {
        for (let i = 0; i < NPC_LIST.FERRIES.length; i++) {
            let NPC = NPC_LIST.FERRIES[i]
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
            player.x = checkPoints[checkPointActiveIndex].x;
            player.y = checkPoints[checkPointActiveIndex].y;
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
    if (typeof PLAYER_LIST[myId] !== 'undefined') {
        offsetX = PLAYER_LIST[myId].x - ((canvas.width / 2) / canvasFact)
        offsetY = PLAYER_LIST[myId].y - ((canvas.height / 2) / canvasFact)
    }
}

function consoleLog() {
    let pack = []

    pack.push(sendNewInfo)

    socket.emit('touch',pack)
}

function checkCollision() {
    if (typeof PLAYER_LIST[myId] !== 'undefined') {
        let indexCol = trackSimpleCol.width * Math.floor(PLAYER_LIST[myId].y) + Math.floor(PLAYER_LIST[myId].x)
        //console.log(collisionDataArray[indexCol])
        let onFerry = false
        for (let i = 0; i < NPC_LIST.FERRIES.length; i++) {
            for (let a in PLAYER_LIST) {
                let NPC = NPC_LIST.FERRIES[i]
                let player = PLAYER_LIST[a]
                if (player.x >= NPC.x && player.x <= (NPC.x + ferrySpr.width) && player.y >= NPC.y && player.y <= (NPC.y + ferrySpr.height)) {
                    if (player.id == myId) onFerry = true;
                    if (NPC.waitCount == 0) {
                        player.x += Math.cos(NPC.dir) * NPC.spd;
                        player.y += Math.sin(NPC.dir) * NPC.spd;
                    }
                }
            }
        }
        if (PLAYER_LIST[myId].x > trackSimple.width || PLAYER_LIST[myId].y > trackSimple.height || PLAYER_LIST[myId].x < 0 || PLAYER_LIST[myId].y < 0) {
            if (!onFerry) {
                PLAYER_LIST[myId].drowning = true;
                sendNewInfo = true;
            }
        } else if (collisionDataArray[indexCol] == '#99d9ea' && !PLAYER_LIST[myId].drowning) {
            if (!onFerry) {
                PLAYER_LIST[myId].drowning = true;
                sendNewInfo = true;
            }
        }

        // Check Point
        for (let i = 0; i < checkPoints.length; i++) {
            if (!checkPoints[i].active)
            {
                if (Math.abs(PLAYER_LIST[myId].x - checkPoints[i].x) < 10 &&
                    Math.abs(PLAYER_LIST[myId].y - checkPoints[i].y) < 10)
                {
                    for (let e = 0; e < checkPoints.length; e++) {
                        checkPoints[e].active = false;
                    }
                    checkPoints[i].active = true;
                    checkPointActiveIndex = i;
                    socket.emit('checkPointActiveIndex', i);
                    break;
                }
            }
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
    drawCheckPoints();
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