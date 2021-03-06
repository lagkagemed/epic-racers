function carUpdate(player)
{
    const acc = 0.1;
    const deacc = 0.04;
    const speedForwardsMax = 3;
    const speedBackwardsMax = 1;
    const turnSpeed = 0.05;

    // Kør når man trykker til siden (som på tablet)
    if (player.pressingLeft || player.pressingRight)
    {
        if (!player.pressingDown)
            player.pressingUp = true;
    }

    // Kør frem og tilbage
    if (player.pressingUp && !player.drowning)
    {
        if (player.speed < speedForwardsMax)
            player.speed += acc;
    }
    else if (player.pressingDown && !player.drowning)
    {
        if (player.speed > -speedBackwardsMax)
            player.speed -= acc; 
    }
    else
    {
        if (player.speed > deacc)
            player.speed -= deacc;
        else if (player.speed < -deacc)
            player.speed += deacc;
        else
            player.speed = 0;
    }

    // Drej
    if (player.speed < -acc || player.speed > acc)
    {
        let turnResistance = 2 - Math.abs(player.speed / speedForwardsMax);
    
        if (player.pressingLeft && !player.drowning) 
        {
            if (player.speed > acc)
                player.dir -= turnSpeed * turnResistance;
            else if (player.speed < -acc)
                player.dir += turnSpeed * turnResistance;
        }
    
        if (player.pressingRight && !player.drowning)
        {
            if (player.speed > acc)
                player.dir += turnSpeed * turnResistance;
            else if (player.speed < -acc)
                player.dir -= turnSpeed * turnResistance;
        }
    }

    // Sæt ny position
    if (!player.gettingPushed) player.x += Math.cos(player.dir) * player.speed;
    if (!player.gettingPushed) player.y += Math.sin(player.dir) * player.speed;

    /*
    // Wrap rundt når man kører ud af skærm
    if (player.x > gameW + 16)
        player.x -= gameW + 32;
    if (player.x < 0 - 16)
        player.x += gameW + 32;
    if (player.y > gameH + 16)
        player.y -= gameH + 32;
    if (player.y < 0 - 16)
        player.y += gameH + 32;
        */
}

function carDraw(player)
{
    if (player.drowning && player.scale > 0) player.scale = player.scale - 0.04
    let playerOffsetX = player.x + (offsetX * -1)
    let playerOffsetY = player.y + (offsetY * -1)
    ctx.translate(playerOffsetX, playerOffsetY);
    ctx.rotate(player.dir); // Angle in radians
    //if (player.id == myId) {ctx.drawImage(carBlueSpr, -carBlueSpr.width / 2 * player.scale, -carBlueSpr.height / 2 * player.scale, carBlueSpr.width * player.scale, carBlueSpr.height * player.scale)} else {ctx.drawImage(carRedSpr, -carBlueSpr.width / 2 * player.scale, -carBlueSpr.height / 2 * player.scale, carBlueSpr.width * player.scale, carBlueSpr.height * player.scale)}
    ctx.drawImage(carSprArr[player.color], -carBlueSpr.width / 2 * player.scale, -carBlueSpr.height / 2 * player.scale, carBlueSpr.width * player.scale, carBlueSpr.height * player.scale)
    ctx.rotate(-player.dir); // Angle in radians
    ctx.translate(-playerOffsetX, -playerOffsetY);
}