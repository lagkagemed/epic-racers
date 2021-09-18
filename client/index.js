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

function updateSillyMovement() {
    for (let i in PLAYER_LIST) {
        let player = PLAYER_LIST[i]
        if (player.pressingUp) player.y--
        if (player.pressingDown) player.y++
        if (player.pressingLeft) player.x--
        if (player.pressingRight) player.x++
    }
}

function drawCars() {
    for (let i in PLAYER_LIST) {
        let player = PLAYER_LIST[i]
        ctx.drawImage(img1, player.x, player.y);
    }
}

function update() {
    checkKeyStates()
    updateKeyStates()
    sendInfo()
    updateSillyMovement()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawCars()
}



setInterval(function(){
    update()
    draw()
},1000/50);