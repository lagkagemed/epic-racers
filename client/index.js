let socket = io();

function update() {

}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(carBlueSpr, 16, 16);
    ctx.drawImage(carRedSpr, 48, 16);
}



setInterval(function(){
    update()
    draw()
},1000/50);