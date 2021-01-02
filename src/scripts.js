const startButton = document.querySelector('.button');
const loading = document.querySelector('.loading');
const speedSlider = document.querySelector('#speed');
const gapSizeSlider = document.querySelector('#gapSize');
const flapButton = document.querySelector('button.flap');
const pipeWidthSlider = document.querySelector('#pipeWidth');

let startGameCounter = 0;
let startGame = false;
let gameSpeed = 8;
let pipeGap = 150;
let pipeWidth = 50;

speedSlider.addEventListener('change', () => {
    console.log(gameSpeed)
    gameSpeed = parseInt(speedSlider.value);
})

gapSizeSlider.addEventListener('change', () => {
    console.log(pipeGap)
    pipeGap = parseInt(gapSizeSlider.value);
})

pipeWidthSlider.addEventListener('change', () => {
    console.log(pipeWidth);
    pipeWidth = parseInt(pipeWidthSlider.value);
})

startButton.onclick = () => {
    startButton.className = 'hidden'

    startGame = true
    if (startGame === true) {
        loading.innerHTML = 'Loading Game Please Wait'
        setTimeout(() => {
            loading.innerHTML = '';
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
            let canvasSize = 350;
            let birdSize = 50
            let birdDY = 0;

            let pipeX = 400;
            let topPipeBottomY = 24;

            let bestScore = 0;

            if (window.innerWidth <= 800 && window.innerHeight <= 800) {
                c.addEventListener('touchstart', (e) => {
                    if (e.type === "touchstart") {
                        birdDY = 8
                    }
                })

                flapButton.addEventListener('touchstart', (e) => {
                    if (e.type === "touchstart") {
                        birdDY = 8
                    }
                })
            }
            else {
                c.addEventListener('touchstart', (e) => {

                    birdDY = 8

                })

                flapButton.addEventListener('click', (e) => {

                    birdDY = 8

                })
            }


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
                pipeX -= gameSpeed
                pipeX < -pipeWidth && ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random()))
                /************/
                context.fillStyle = 'black'
                context.fillText(score++, 9, 25)

                bestScore = bestScore < score ? score : bestScore;
                context.fillText(`Best Score: ${bestScore}`, 9, 50)

                if (birdY > canvasSize || (pipeX < birdSize * (2334 / 2156) && (birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap))) { birdDY = 0, birdY = 200, pipeX = canvasSize, score = 0 }
            }, interval)

        }, 2000)
    }

}
