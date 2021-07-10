import './index.scss';
import SenseiWalk from './assets/Male-1-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let spritePosition = 0;
let buttonPressed = null;
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;
let pY = canvasWidth / 2 - spriteW / 2;
let pX = canvasHeight / 2 - spriteH / 2;

function keyDownHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        buttonPressed = e.key;
    }
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        buttonPressed = e.key;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        buttonPressed = e.key;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        buttonPressed = e.key;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Down' || e.key === 'ArrowDown') {
        buttonPressed = null;
    }
    if (e.key === 'Up' || e.key === 'ArrowUp') {
        buttonPressed = null;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        buttonPressed = null;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        buttonPressed = null;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

img.addEventListener('load', () => {
    setInterval(() => {
        let buttonState = '';

        if ((buttonPressed === 'Down' || buttonPressed === 'ArrowDown') && pY < canvasHeight - spriteH) {
            buttonState = 'down';
        }
        if ((buttonPressed === 'Up' || buttonPressed === 'ArrowUp') && pY > 0) {
            buttonState = 'up';
        }
        if ((buttonPressed === 'Left' || buttonPressed === 'ArrowLeft') && pX > 0) {
            buttonState = 'left';
        }
        if ((buttonPressed === 'Right' || buttonPressed === 'ArrowRight') && pX < canvasWidth - spriteW) {
            buttonState = 'right';
        }

        switch (buttonState) {
            case 'down':
                pY += 10;
                cycle = (cycle + 1) % shots;
                spritePosition = 0;
                break;
            case 'up':
                pY -= 10;
                cycle = (cycle + 1) % shots;
                spritePosition = spriteH * 3;
                break;
            case 'left':
                pX -= 10;
                cycle = (cycle + 1) % shots;
                spritePosition = spriteH;
                break;
            case 'right':
                pX += 10;
                cycle = (cycle + 1) % shots;
                spritePosition = spriteH * 2;
                break;
            default:
                break;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#38789e';

        ctx.drawImage(img, cycle * spriteW, spritePosition, spriteW, spriteH, pX, pY, 48, 48);
    }, 120);
});
