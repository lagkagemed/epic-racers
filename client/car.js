function carUpdate(player)
{
    const acc = 0.1;
    const deacc = 0.04;
    const speedForwardsMax = 3;
    const speedBackwardsMax = 1;
    const turnSpeed = 0.05;
    const turnResistanceMax = 2;

    // Kør frem og tilbage
    if (player.pressingUp)
    {
        player.speed += acc;
        if (player.speed > speedForwardsMax) player.speed = speedForwardsMax;
    }
    else if (player.pressingDown)
    {
        player.speed -= acc;
        if (player.speed < -speedBackwardsMax) player.speed = -speedBackwardsMax;
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
        let turnResistance = turnResistanceMax - Math.abs(player.speed / speedForwardsMax);
    
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

    // Wrap rundt når man kører ud af skærm
    if (player.x > 400 + 16)
        player.x -= 400 + 32;
    if (player.x < 0 - 16)
        player.x += 400 + 32;
    if (player.y > 240 + 16)
        player.y -= 240 + 32;
    if (player.y < 0 - 16)
        player.y += 240 + 32;
}

function carDraw(player)
{
    ctx.translate(player.x, player.y);
    ctx.rotate(player.dir); // Angle in radians
    if (player.id == myId) {ctx.drawImage(carBlueSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2)} else {ctx.drawImage(carRedSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2)}
    ctx.rotate(-player.dir); // Angle in radians
    ctx.translate(-player.x, -player.y);
}