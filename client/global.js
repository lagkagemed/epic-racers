const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false

let wWIDTH = 0
let wHEIGHT = 0

let PLAYER_LIST = {}
let myId = 0

// Car sprites
var carBlueSpr = new Image();
carBlueSpr.src = './client/assets/car_blue.png';
var carRedSpr = new Image();
carRedSpr.src = './client/assets/car_red.png';
