
const main = document.querySelector(".main");
const holes = document.querySelectorAll(".hole");
const pointsElement = document.querySelector("#points");
const highScoreElement = document.querySelector("#high-score");
const difficultySlider = document.querySelector("#difficultySlider");
const difficulty = document.querySelector("#difficulty");
const message = document.querySelector("#message");
const timerElement = document.querySelector("#timer");
const playAgain = document.querySelector("#play-again");
const timerSlider = document.querySelector("#timerSlider");
const toggleSoundButton = document.querySelector("#toggle-sound");
const toggleSoundIcon = document.querySelector("#toggle-sound-icon");

let whackSound = new Audio("sounds/whack.wav");
let boomSound = new Audio("sounds/boom.ogg");


const moleSRC = "images/mole.png";
const holeSRC = "images/hole.png";
const toggleSoundIconSRC = toggleSoundIcon.src;

let points = 0;
let highScore = 0;
let difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);
let timerLength = Math.floor(timerSlider.value);
let startingTime = timerLength;
let timerOn = false;

timerElement.textContent = timerLength;

holesList = [];

spawnMole();
displayDifficulty();
displayTimerValue();


holes.forEach((hole) => {
    
    const holeSRC = hole.src;

    // console.log(holeSRC);

    hole.addEventListener("click", () => {

        // console.log(hole.src);
        difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);
        timerLength = Math.floor(timerSlider.value);

        if (hole.src != holeSRC) {

            // Makes a whack sound
            if (whackSound) {
                whackSound.currentTime = 0;
                whackSound.play(); 
            }
             

            // disable timer slider. so user cant change time mid game
            timerSlider.disabled = true;


            
            
            hole.src = holeSRC;
            setDifficulty(difficultyValue);
            addPoint();

            if (!timerOn) {
                timer(timerLength); // Starts the timer
                timerOn = true;
            }

            // if (points >= 10) {
            //     showMessage();
            // }
            
        }
    });
})

function wait(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(x);
        }, x);
    });
}

async function spawnMole() {
    const x = await wait(1000);

    const moleID = getRandomInt(0, 9);
    // console.log(moleID);
    holes[moleID].src = moleSRC;
}

// Gets a random number between max & min
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
  

function addPoint() {
    points += 1;
    pointsElement.textContent = points;
}

difficultySlider.oninput = () => {
    displayDifficulty();
};

function displayDifficulty() {
    // difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);
    difficulty.textContent = Math.floor(difficultySlider.value / 10 / 4 + 1);
}


function setDifficulty(difficulty) {
    for (let i = 0; i < difficulty; i++) {
        // console.log(i);
        spawnMole();
    }
}

// displays message
function showMessage() {
    main.style = "display : none;";
    message.style = "display : block;"

    switch (points) {
        case 420:
            message.children[0].textContent = `Impressive Karlos! You scored ${points} points in ${startingTime} seconds!`;
            break;
    

        case 69:
            message.children[0].textContent = `I see you Karlos! You scored ${points} points in ${startingTime} seconds!`;
            break;
    
        default:
            message.children[0].textContent = `Well done! You scored ${points} points in ${startingTime} seconds!`;
            break;
    }
        
    // Makes a whack sound
    if (whackSound) {
        boomSound.currentTime = 0;
        boomSound.play();  
    }
    

    // await wait(1000);
    // message.style = "display : none;"
}

async function timer(time) {
    let startTime = time;
    for (let i = 0; i < startTime; i++) {
        await wait(1000);
        time -= 1;
        timerElement.textContent = time;
        console.log(time);
    }
    showMessage();
}



function restartGame() {
    highScore = points;
    highScoreElement.textContent = points;
    points = 0;
    pointsElement.textContent = points;
    difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);
    timerLength = 2;
    timerOn = false;

    timerSlider.disabled = false; // renable timer slider
    timerElement.textContent = timerLength;

    holes.forEach((hole) => {
        console.log(hole.src);
        hole.src = holeSRC;
    });

    spawnMole();
    displayDifficulty();
    displayTimerValue();
}


playAgain.addEventListener("click", () => {
    restartGame();
    main.style = "display : flex;";
    message.style = "display : none;"
});


function displayTimerValue() { 
    let time = Math.floor(timerSlider.value);
    timerElement.textContent = time;
    startingTime = time;
}

timerSlider.oninput = () => {
    displayTimerValue();
    
};


toggleSoundButton.addEventListener("click", () => {
    console.log(toggleSoundIcon.src);

    if (toggleSoundIcon.src === toggleSoundIconSRC) {
        toggleSoundIcon.src = "icons/sound-icon-off.png"
        whackSound = null;
        boomSound = null;
    }
    else {
        toggleSoundIcon.src = "icons/sound-icon-on.png";
        whackSound = new Audio("sounds/whack.wav");
        boomSound = new Audio("sounds/boom.ogg");
    }
})