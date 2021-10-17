class CheckPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = false;
    }

    draw(offsetX, offsetY) {
        let x = this.x + (offsetX * -1);
        let y = this.y + (offsetY * -1);
        if (this.active)
        {
            ctx.drawImage(
                checkPointActiveSpr,
                x - (checkPointActiveSpr.width / 2),
                y - (checkPointActiveSpr.height / 2),
                checkPointActiveSpr.width,
                checkPointActiveSpr.height);
        }
        else
        {
            ctx.drawImage(
                checkPointInactiveSpr,
                x - (checkPointInactiveSpr.width / 2),
                y - (checkPointInactiveSpr.height / 2),
                checkPointInactiveSpr.width,
                checkPointInactiveSpr.height);
        }
    }
}

function checkPointSetActive(index) {
    if (index >= 0)
    {
        if (index > checkPointActiveIndex)
        {
            for (let i = 0; i < checkPoints.length; i++) {
                checkPoints[i].active = false;
            }        
            checkPoints[index].active = true;
            checkPointActiveIndex = index;   
            return true;
        }
    }
    else
    {
        checkPointActiveIndex = -1;
    }

    return false;
}

checkPoints.push(new CheckPoint(50, 150));
checkPoints.push(new CheckPoint(310, 170));
checkPoints.push(new CheckPoint(670, 230));