export function carUpdate(player)
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