let gameW = 400;
let gameH = 240;

const canvas = document.getElementById("canvas")
canvas.width = gameW;
canvas.height = gameH;
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false

let drowning = false
let drowningCooldown = 0

let wWIDTH = 0
let wHEIGHT = 0

let offsetX = 0;
let offsetY = 0;
let canvasFact;

let t = performance.now()
let deltat = 10

let PLAYER_LIST = {}
let myId = 0
let sendNewNew = false;

// Car sprites
var carBlueSpr = new Image();
carBlueSpr.src = './client/assets/car_blue.png';
var carRedSpr = new Image();
carRedSpr.src = './client/assets/car_red.png';

let trackSimple = new Image();
trackSimple.src = './client/assets/track_island.png';


let trackSimpleCol = new Image();
trackSimpleCol.src = './client/assets/track_island.png';

trackSimpleCol.addEventListener("load", function(){
    loadColDataArray(trackSimpleCol)
});

let trackCool = new Image();
trackCool.src = './client/assets/track_cool.png';