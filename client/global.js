const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false

// Car sprites
var carBlueSpr = new Image();
carBlueSpr.src = './client/assets/car_blue.png';
var carRedSpr = new Image();
carRedSpr.src = './client/assets/car_red.png';