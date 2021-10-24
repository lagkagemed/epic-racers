let collisionDataArray = []

function loadColDataArray(track) {

    const collisionCanvas = document.createElement('canvas')
    const collisionCtx = collisionCanvas.getContext("2d")
    collisionCtx.imageSmoothingEnabled = false
    collisionCtx.webkitImageSmoothingEnabled = false

    collisionCanvas.width = track.width
    collisionCanvas.height = track.height  
    collisionCtx.drawImage(track, 0, 0);
    let inputImg = collisionCtx.getImageData(0,0,track.width,track.height);
    let collisionData = inputImg.data

    for ( let i = 0; i < collisionData.length; i+=4 ){

        //find the colour of this particular pixel
        let colour = "#";

        //---------------------------------------------------------------
        //convert the RGB numbers into a hex string. i.e. [255, 10, 100]
        //into "FF0A64"
        //---------------------------------------------------------------
        function _Dex_To_Hex( number ){
            let out = number.toString(16);
            if ( out.length < 2 ){
                out = "0" + out;
            }
            return out;
        }
        for ( let colourIndex = 0; colourIndex < 3; colourIndex++ ){
            colour += _Dex_To_Hex( collisionData[ i+colourIndex ] );
        }
        //set the fill colour
        collisionDataArray.push(colour)

    }

    //console.log(collisionDataArray)

}

function checkCollision() {
    if (typeof PLAYER_LIST[myId] !== 'undefined') {
        let indexCol = trackSimpleCol.width * Math.floor(PLAYER_LIST[myId].y) + Math.floor(PLAYER_LIST[myId].x)
        //console.log(collisionDataArray[indexCol])
        let onFerry = false
        if (collisionDataArray[indexCol] == '#ff2b3c' && PLAYER_LIST[myId].color != 0) {
            PLAYER_LIST[myId].color = 0
            sendNewInfo = true
        }
        if (collisionDataArray[indexCol] == '#70ff9b' && PLAYER_LIST[myId].color != 1) {
            PLAYER_LIST[myId].color = 1
            sendNewInfo = true
        }
        if (collisionDataArray[indexCol] == '#2b47ff' && PLAYER_LIST[myId].color != 2) {
            PLAYER_LIST[myId].color = 2
            sendNewInfo = true
        }
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
        for (let i in PLAYER_LIST) {
            PLAYER_LIST[i].gettingPushed = false
        }
        for (let i = 0; i < NPC_LIST.BULLDOZERS.length; i++) {
            for (let a in PLAYER_LIST) {
                let NPC = NPC_LIST.BULLDOZERS[i]
                let player = PLAYER_LIST[a]
                if (player.x + carBlueSpr.width / 2 >= NPC.x - bullDSpr.width / 2 && player.x - carBlueSpr.width / 2 <= NPC.x + bullDSpr.width / 2 && player.y + carBlueSpr.height / 2 >= NPC.y - bullDSpr.height / 2 && player.y - carBlueSpr.height / 2 <= NPC.y + bullDSpr.height / 2) {
                    if (!player.drowning) {
                        player.speed = 0
                        player.x += Math.cos(NPC.dir) * NPC.spd;
                        player.y += Math.sin(NPC.dir) * NPC.spd;
                        player.gettingPushed = true
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
                    if (checkPointSetActive(i))
                        sendNewCheckPoint = true;
                    break;
                }
            }
        }

        for (let i = 0; i < NPC_LIST.BOXES.length; i++) {
            let box = NPC_LIST.BOXES[i]
            let player = PLAYER_LIST[myId]
            if (Math.abs(player.x - box.x) < (boxSpr.width) &&
                Math.abs(player.y - box.y) < (boxSpr.height))
            {
                if (torqueToSend.length == 0)
                    torqueToSend.push({spd: player.speed * 1.2, dir: player.dir, id: i})
                    haveSentTorque = false
                break;
            }
        }
    }
}