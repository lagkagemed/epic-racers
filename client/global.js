let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false




// Testing draw car
var img1 = new Image();
img1.onload = function () {
    ctx.drawImage(img1, 16, 16);
};
img1.src = './client/assets/car_blue.png';