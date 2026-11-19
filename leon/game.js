console.log("game.js and index.html created. initial text created.");
let points = 0

function getPoints() {
    points = points + 1
    console.log("Points now:", points);
    pointsText.textContent = points;
}

const pointsText = document.getElementById("points");

const pointButton = document.getElementById("point-button");
pointButton.addEventListener("click", getPoints);
