
const main = document.querySelector(".main");
const holes = document.querySelectorAll(".hole");
const pointsElement = document.querySelector("#points");
const difficultySlider = document.querySelector("#difficultySlider");
const difficulty = document.querySelector("#difficulty");

const moleSRC = "images/mole.png";
const holeSRC = "images/hole.png";

holesList = [];

spawnMole();
displayDifficulty()

let points = 0;
let difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);


holes.forEach((hole) => {
    
    const holeSRC = hole.src;

    console.log(holeSRC);

    hole.addEventListener("click", () => {

        console.log(hole.src);
        difficultyValue = Math.floor(difficultySlider.value / 10 / 4 + 1);

        if (hole.src != holeSRC) {
            hole.src = holeSRC;
            setDifficulty(difficultyValue);
            addPoint();
        }
    });
})

function wait(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(x);
        }, 1000);
    });
}

async function spawnMole() {
    const x = await wait(10);

    const moleID = getRandomInt(0, 9);
    console.log(moleID);
    holes[moleID].src = moleSRC;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
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
        console.log(i);
        spawnMole();
    }
}