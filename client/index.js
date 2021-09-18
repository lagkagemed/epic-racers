let socket = io();

function update() {

}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(img1, 16, 16);
}



setInterval(function(){
    update()
    draw()
},1000/50);