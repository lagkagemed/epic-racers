const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false

let PLAYER_LIST = {}
let myId = 0

// Testing draw car
var img1 = new Image();
img1.src = './client/assets/car_blue.png';