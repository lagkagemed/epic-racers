class CheckPoint {
    constructor(x, y, active = false) {
        this.x = x;
        this.y = y;
        this.active = active;
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

checkPoints.push(new CheckPoint(50, 50, true));
checkPoints.push(new CheckPoint(50, 150));
checkPoints.push(new CheckPoint(670, 230));