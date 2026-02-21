const plyrSide1 = document.querySelector(".player-side--1");
const plyrSide2 = document.querySelector(".player-side--2");
const newGameBtn = document.querySelector(".new-game--btn");
const rollBtn = document.querySelector(".roll-dice--btn");
const holdBtn = document.querySelector(".hold--btn");
const diceImg = document.querySelector(".dice-img");
let playerScore = [0, 0]
let currentPlyr = 1;
let currentScore = 0;


const changePlayer = () => {
    currentPlyr = currentPlyr === 1 ? 2 : 1;
    plyrSide1.classList.toggle("current-player");
    plyrSide2.classList.toggle("current-player");
}

const endGame = () => {
    document.querySelector(`#player-name--${currentPlyr}`).textContent = "🎉WINNER";
    rollBtn.style.display = "none";
    holdBtn.style.display = "none";
    diceImg.classList.add("hidden");
    document.querySelector(`.player-side--${currentPlyr}`).classList.add("winner");
}


rollBtn.addEventListener("click", () => {
    const dice = Math.ceil(Math.random() * 6);
    diceImg.src = `assets/images/dice_${dice}.png`;
    if (diceImg.classList.contains("hidden")) {
        diceImg.classList.remove("hidden");
    };
    if (dice === 1) {
        currentScore = 0;
        document.querySelector(`#current-score--${currentPlyr}`).textContent = currentScore;
        changePlayer();
    } else {
        currentScore += dice;
        document.querySelector(`#current-score--${currentPlyr}`).textContent = currentScore;
    }
});

holdBtn.addEventListener("click", () => {
    playerScore[currentPlyr - 1] += currentScore;
    document.querySelector(`#total-score--${currentPlyr}`).textContent = playerScore[currentPlyr - 1]
    currentScore = 0;
    document.querySelector(`#current-score--${currentPlyr}`).textContent = currentScore;
    if (document.querySelector(`#total-score--${currentPlyr}`).textContent >= 100) {
        endGame();
    } else {
        changePlayer();
    };
})

newGameBtn.addEventListener("click", () => {
    currentScore = 0;
    document.querySelectorAll(".current-score--value").forEach(el => {
        el.textContent = currentScore;
    });
    document.querySelector(`#player-name--${currentPlyr}`).textContent = `PLAYER ${currentPlyr}`;
    rollBtn.style.display = "block";
    holdBtn.style.display = "block";
    diceImg.classList.add("hidden")
    document.querySelector(`.player-side--${currentPlyr}`).classList.remove("winner");
    playerScore = [0, 0];
    document.querySelector(`#total-score--1`).textContent = playerScore[0];
    document.querySelector(`#total-score--2`).textContent = playerScore[1];
    currentPlyr = 1;
    if (!plyrSide1.classList.contains("current-player")) {
        plyrSide2.classList.remove("current-player");
        plyrSide1.classList.add("current-player");
    }
})