let pressingUp = false
let pressingDown = false
let pressingLeft = false
let pressingRight = false

let haveSentUp = false
let haveSentDown = false
let haveSentLeft = false
let haveSentRight = false

let sendNewInfo = false

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.addEventListener('keydown', logKeyDown);
document.addEventListener('keyup', logKeyUp);

const btnUP = 38;
const btnDOWN = 40;
const btnLEFT = 37;
const btnRIGHT = 39;

function logKeyDown(e) {
    if (e.keyCode == btnUP) pressingUp = true
    if (e.keyCode == btnDOWN) pressingDown = true
    if (e.keyCode == btnLEFT) pressingLeft = true
    if (e.keyCode == btnRIGHT) pressingRight = true
}

function logKeyUp(e) {
    if (e.keyCode == btnUP) {
        pressingUp = false
        haveSentUp = false
        sendNewInfo = true
    }

    if (e.keyCode == btnDOWN) {
        pressingDown = false
        haveSentDown = false
        sendNewInfo = true
    }

    if (e.keyCode == btnLEFT) {
        pressingLeft = false
        haveSentLeft = false
        sendNewInfo = true
    }

    if (e.keyCode == btnRIGHT) {
        pressingRight = false
        haveSentRight = false
        sendNewInfo = true
    }

}

function checkKeyStates() {
    if (pressingUp && !haveSentUp) {
        sendNewInfo = true
        haveSentUp = true
    }

    if (pressingDown && !haveSentDown) {
        sendNewInfo = true
        haveSentDown = true
    }

    if (pressingRight && !haveSentRight) {
        sendNewInfo = true
        haveSentRight = true
    }

    if (pressingLeft && !haveSentLeft) {
        sendNewInfo = true
        haveSentLeft = true
    }

}