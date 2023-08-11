const mg_nodisplay = "nodisplay";
const mgString = {
    mgDirections: "mgDirections",
    mgHomeScreen: "mgHomeScreen",
    mgBoard: "mgBoard",
    memoryHighlight: "memoryHighlight",
    cpuClick: "cpuClick",
    mgHighScore: "mgHighScore"
}
const mgCPUOptions = [
    "mgTopLeft",
    "mgTopRight",
    "mgBottomLeft",
    "mgBottomRight"
];

let clickIndex = 0;

let cpuMoves = [];

let isCPUMove = true;

const setHighScore = score => {
    const highScore = localStorage.getItem(mgString.mgHighScore);
    if(score){
        localStorage.setItem(mgString.mgHighScore, score);
    } else if(!highScore){
        localStorage.setItem(mgString.mgHighScore, 0);
    }
    getById(mgString.mgHighScore).innerText = localStorage.getItem(mgString.mgHighScore);
}

setHighScore();

const showMGDirections = () => {
    removeAttr(getById(mgString.mgDirections), mg_nodisplay);
    setAttr(getById(mgString.mgHomeScreen), mg_nodisplay);
}

const highlighCPUMove = move => {
    addClass(getById(move), mgString.cpuClick);
    setTimeout(() => {
        removeClass(getById(move), mgString.cpuClick);
    }, 500);
}

const cpuMove = () => {
    isCPUMove = true;

    const move = getRandomIndexFromArray(mgCPUOptions);
    cpuMoves.push(move);
    let delay = 0;

    cpuMoves.forEach(box => {
        setTimeout(() => {
            highlighCPUMove(box);
        }, delay);
        delay += 1000;
    });

    setTimeout(() => {
        isCPUMove = false;
    }, delay - 1000);
}

const memoryGameStart = () => {
    setAttr(getById(mgString.mgDirections), mg_nodisplay);
    removeAttr(getById(mgString.mgBoard), mg_nodisplay);
    setTimeout(() => {
        cpuMove();
    }, 1000);
}

const addHighlight = id => {
    addClass(getById(id), mgString.memoryHighlight);
}

const removeHighlight = id => {
    removeClass(getById(id), mgString.memoryHighlight);
}

const gameOver = () => {
    setAttr(getById(mgString.mgBoard), mg_nodisplay);
    removeAttr(getById(mgString.mgHomeScreen), mg_nodisplay);
    clickIndex = 0;
    cpuMoves = [];
    isCPUMove = true;
    getById("mgCount").innerText = 0;
}

const incrementGuesses = () => {
    const mgCount = getById("mgCount");
    const currentNumber = parseInt(mgCount.innerText);
    mgCount.innerText = currentNumber + 1;
    const highScore = localStorage.getItem(mgString.mgHighScore);
    if(highScore < (currentNumber + 1)){
        setHighScore(currentNumber + 1);
    }
}

const makeMemoryGuess = id => {
    if(isCPUMove) return;
    if(id === cpuMoves[clickIndex]){
        console.log("correct move");
        clickIndex++;

        if(clickIndex === cpuMoves.length){
            clickIndex = 0;
            isCPUMove = true;
            setTimeout(() => {
                cpuMove();
            }, 1000);
            incrementGuesses();
        }
    } else {
        gameOver();
    }
}