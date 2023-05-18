
const main = document.querySelector(".main");
const holes = document.querySelectorAll(".hole");
const pointsElement = document.querySelector("#points");

const moleSRC = "images/mole.png";
const holeSRC = "images/hole.png";

holesList = [];

spawnMole();

let points = 0;

holes.forEach((hole) => {
    
    const holeSRC = hole.src;

    console.log(holeSRC);

    hole.addEventListener("click", () => {

        console.log(hole.src);

        if (hole.src != holeSRC) {
            hole.src = holeSRC;
            spawnMole();
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

    const moleID = getRandomInt(0, 5);
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