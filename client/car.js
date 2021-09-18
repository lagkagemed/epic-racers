function carUpdate(player)
{
    if (player.pressingUp) player.y--;

    if (player.pressingDown) player.y++;

    if (player.pressingLeft) 
    {
        player.dir -= 0.1;
    }
    
    if (player.pressingRight)
    {
        player.dir += 0.1;
    }
}

function carDraw(player)
{
    ctx.translate(player.x, player.y);
    ctx.rotate(player.dir); //angleInRadians
    ctx.drawImage(carBlueSpr, -carBlueSpr.width / 2, -carBlueSpr.height / 2);
    ctx.rotate(-player.dir); //angleInRadians
    ctx.translate(-player.x, -player.y);
}