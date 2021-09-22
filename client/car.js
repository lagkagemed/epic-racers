function carUpdate(player)
{
    const acc = 0.1;
    const deacc = 0.04;
    const speedForwardsMax = 3;
    const speedBackwardsMax = 1;
    const turnSpeed = 0.05;

    // Kør frem og tilbage
    if (player.pressingUp)
    {
        if (player.speed < speedForwardsMax)
            player.speed += acc;
    }
    else if (player.pressingDown)
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
    
        if (player.pressingLeft) 
        {
            player.dir -= turnSpeed * turnResistance;
        }
    
        if (player.pressingRight)
        {
            player.dir += turnSpeed * turnResistance;
        }
    }

    // Sæt ny position
    player.x += Math.cos(player.dir) * player.speed;
    player.y += Math.sin(player.dir) * player.speed;

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

function carUpdateFollower(player, follower) {
    follower.dir = player.dir
    let followFact = 1.2
    let maxRng = 50
    let minRng = 10
    let diffX = follower.x - player.x
    let diffY = follower.y - player.y

    if (diffX < 0) diffX * -1
    if (diffY < 0) diffY * -1

    if (diffX + diffY > maxRng || diffX + diffY < minRng) {
        follower.x = player.x
        follower.y = player.y
    } else {
        if (follower.x - player.x < 0) 
        follower.x += player.speed * followFact 
        else
        follower.x -= player.speed * followFact 

        if (follower.y - player.y < 0) 
        follower.y += player.speed * followFact 
        else
        follower.y -= player.speed * followFact 
    }
}



function carDraw(player)
{
    let playerOffsetX = player.x + (offsetX * -1)
    let playerOffsetY = player.y + (offsetY * -1)
    ctx.translate(playerOffsetX, playerOffsetY);
    ctx.rotate(player.dir); // Angle in radians
    if (player.id == myId) {ctx.drawImage(carBlueSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2)} else {ctx.drawImage(carRedSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2)}
    ctx.rotate(-player.dir); // Angle in radians
    ctx.translate(-playerOffsetX, -playerOffsetY);
}