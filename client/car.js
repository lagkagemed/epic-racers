const acc = 0.1;
// const accMax = 1;
const speedMax = 3;

function carUpdate(player)
{
    if (player.pressingUp)
    {
        // player.acc += acc;
        // if (player.acc > accMax) player.acc = accMax;

        player.speed += acc;
        if (player.speed > speedMax) player.speed = speedMax;
    }
    else if (player.pressingDown)
    {
        // player.acc -= acc;
        // if (player.acc < -accMax) player.acc = -accMax;

        player.speed -= acc;
        if (player.speed < -speedMax) player.speed = -speedMax;
    }
    // else
    // {
    //     if ()
    // }

    if (player.pressingLeft) 
    {
        player.dir -= 0.1;
    }

    if (player.pressingRight)
    {
        player.dir += 0.1;
    }

    // player.x = 
    player.y -= player.speed;
}

function carDraw(player)
{
    ctx.translate(player.x, player.y);
    ctx.rotate(player.dir); //angleInRadians
    ctx.drawImage(carBlueSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2);
    ctx.rotate(-player.dir); //angleInRadians
    ctx.translate(-player.x, -player.y);
}