// getting context and canvas
const c = document.querySelector('#c');
const context = c.getContext("2d");

//making bird image
const bird = new Image()
bird.src = "flappy-bird.png"

let score = 0;

let birdX = 0;
let birdY = 200;
let interval = 24;
let canvasSize = 500;
let birdSize = 50
let birdDY = 0;

let pipeX = 400;
let pipeWidth = 24;
let pipeGapBottomY = 24;
let pipeGap = 150;
let topPipeBottomY = 24;

c.onclick = () => { birdDY = 9 } //make bird go up

setInterval(() => {
    /***********/
    context.fillStyle = "skyblue"; //background-color
    context.fillRect(0, 0, canvasSize, canvasSize);  //making background
    /**********/
    birdY -= birdDY -= 0.5 // make bird go down
    context.drawImage(bird, birdX, birdY, birdSize * (2334 / 2156), birdSize) //making a bird
    /**********/
    context.fillStyle = 'green'
    context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY)
    context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize)
    pipeX -= 8
    pipeX < -pipeWidth && ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random()))
    /************/
    context.fillStyle = 'black'
    context.fillText(score++, 9, 25)
    if (birdY > canvasSize || (pipeX < birdSize * (2334 / 2156) && (birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap))) { birdDY = 0, birdY = 200, pipeX = canvasSize, score = 0 }
}, interval)
