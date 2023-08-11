let isCpuTurn = false;

let tttScore;

const tttKey = "ticTacToeScore";

const hasX = id => {
    return getById(id).classList.contains("x");
}

const hasO = id => {
    return getById(id).classList.contains("o");
}

const hasXorO = id => {
    return (
        getById(id).classList.contains("x") ||
        getById(id).classList.contains("o")
    );
}

const getScoringId = array => {
    for(let i = 0; i < array.length; i++){
        const data = array[i];
        if(data[0] && data[1] && data[2]){
            return data[3];
        }
    }
}

const getXScoringChances = () => {
    const combinations = [
        [!hasXorO(1), hasX(2), hasX(3), 1], // horizontal [ox!=1, x=2, x=3]
        [hasX(1), !hasXorO(2), hasX(3), 2], // horizontal [x=1, ox!=2, x=3]
        [hasX(1), hasX(2), !hasXorO(3), 3], // horizontal [x=1, x=2, ox!=3]
        
        [!hasXorO(4), hasX(5), hasX(6), 4], // horizontal [ox!=4, x=5, x=6]
        [hasX(4), !hasXorO(5), hasX(6), 5], // horizontal [x=4, ox!=5, x=6]
        [hasX(4), hasX(5), !hasXorO(6), 6], // horizontal [x=4, x=5, ox!=6]
    
        [!hasXorO(7), hasX(8), hasX(9), 7], // horizontal [ox!=7, x=8, x=9]
        [hasX(7), !hasXorO(8), hasX(9), 8], // horizontal [x=7, ox!=8, x=9]
        [hasX(7), hasX(8), !hasXorO(9), 9], // horizontal [x=7, x=8, ox!=9]
    
        [!hasXorO(1), hasX(4), hasX(7), 1], // vertical [ox!=1, x=4, x=7]
        [hasX(1), !hasXorO(4), hasX(7), 4], // vertical [x=1, ox!=4, x=7]
        [hasX(1), hasX(4), !hasXorO(7), 7], // vertical [x=1, x=4, ox!=7]
    
        [!hasXorO(2), hasX(5), hasX(8), 2], // vertical [ox!=2, x=5, x=8]
        [hasX(2), !hasXorO(5), hasX(8), 5], // vertical [x=2, ox!=5, x=8]
        [hasX(2), hasX(5), !hasXorO(8), 8], // vertical [x=2, x=5, ox!=8]
    
        [!hasXorO(3), hasX(6), hasX(9), 3], // vertical [ox!=3, x=6, x=9]
        [hasX(3), !hasXorO(6), hasX(9), 6], // vertical [x=3, ox!=6, x=9]
        [hasX(3), hasX(6), !hasXorO(9), 9], // vertical [x=3, x=6, ox!=9]
    
        [!hasXorO(1), hasX(5), hasX(9), 1], // diagnal [ox!=1, x=5, x=9]
        [hasX(1), !hasXorO(5), hasX(9), 5], // diagnal [x=1, ox!=5, x=9]
        [hasX(1), hasX(5), !hasXorO(9), 9], // diagnal [x=1, x=5, ox!=9]
    
        [!hasXorO(3), hasX(5), hasX(7), 3], // diagnal [ox!=3, x=5, x=7]
        [hasX(3), !hasXorO(5), hasX(7), 5], // diagnal [x=3, ox!=5, x=7]
        [hasX(3), hasX(5), !hasXorO(7), 7], // diagnal [x=3, x=5, ox!=7]
    ];
    return combinations;
}

const hasXScored = () => {
    const combinations = [
        [hasX(1), hasX(2), hasX(3)],
        [hasX(4), hasX(5), hasX(6)],
        [hasX(7), hasX(8), hasX(9)],
        [hasX(1), hasX(4), hasX(7)],
        [hasX(2), hasX(5), hasX(8)],
        [hasX(3), hasX(6), hasX(9)],
        [hasX(1), hasX(5), hasX(9)],
        [hasX(3), hasX(5), hasX(7)],
    ];
    for(let x = 0; x < combinations.length; x++){
        const data = combinations[x];
        if(data[0] && data[1] && data[2]){
            return true;
        }
    }
    return false;
}

const getOScoringChances = () => {
    const combinations = [
        [!hasXorO(1), hasO(2), hasO(3), 1], // horizontal [ox!=1, x=2, x=3]
        [hasO(1), !hasXorO(2), hasO(3), 2], // horizontal [x=1, ox!=2, x=3]
        [hasO(1), hasO(2), !hasXorO(3), 3], // horizontal [x=1, x=2, ox!=3]
        
        [!hasXorO(4), hasO(5), hasO(6), 4], // horizontal [ox!=4, x=5, x=6]
        [hasO(4), !hasXorO(5), hasO(6), 5], // horizontal [x=4, ox!=5, x=6]
        [hasO(4), hasO(5), !hasXorO(6), 6], // horizontal [x=4, x=5, ox!=6]
    
        [!hasXorO(7), hasO(8), hasO(9), 7], // horizontal [ox!=7, x=8, x=9]
        [hasO(7), !hasXorO(8), hasO(9), 8], // horizontal [x=7, ox!=8, x=9]
        [hasO(7), hasO(8), !hasXorO(9), 9], // horizontal [x=7, x=8, ox!=9]
    
        [!hasXorO(1), hasO(4), hasO(7), 1], // vertical [ox!=1, x=4, x=7]
        [hasO(1), !hasXorO(4), hasO(7), 4], // vertical [x=1, ox!=4, x=7]
        [hasO(1), hasO(4), !hasXorO(7), 7], // vertical [x=1, x=4, ox!=7]
    
        [!hasXorO(2), hasO(5), hasO(8), 2], // vertical [ox!=2, x=5, x=8]
        [hasO(2), !hasXorO(5), hasO(8), 5], // vertical [x=2, ox!=5, x=8]
        [hasO(2), hasO(5), !hasXorO(8), 8], // vertical [x=2, x=5, ox!=8]
    
        [!hasXorO(3), hasO(6), hasO(9), 3], // vertical [ox!=3, x=6, x=9]
        [hasO(3), !hasXorO(6), hasO(9), 6], // vertical [x=3, ox!=6, x=9]
        [hasO(3), hasO(6), !hasXorO(9), 9], // vertical [x=3, x=6, ox!=9]
    
        [!hasXorO(1), hasO(5), hasO(9), 1], // diagnal [ox!=1, x=5, x=9]
        [hasO(1), !hasXorO(5), hasO(9), 5], // diagnal [x=1, ox!=5, x=9]
        [hasO(1), hasO(5), !hasXorO(9), 9], // diagnal [x=1, x=5, ox!=9]
    
        [!hasXorO(3), hasO(5), hasO(7), 3], // diagnal [ox!=3, x=5, x=7]
        [hasO(3), !hasXorO(5), hasO(7), 5], // diagnal [x=3, ox!=5, x=7]
        [hasO(3), hasO(5), !hasXorO(7), 7], // diagnal [x=3, x=5, ox!=7]
    ];
    return combinations;
}

const allBoxesTaken = () => {
    const combinations = [
        hasXorO(1), hasXorO(2), hasXorO(3),
        hasXorO(4), hasXorO(5), hasXorO(6),
        hasXorO(7), hasXorO(8), hasXorO(9),
    ];
    return !combinations.includes(false);
}

const getRandomBox = () => {
    const openSquares = [];
    for(let i = 1; i < 10; i++){
        if(!hasXorO(i)){
            openSquares.push(i);
        }
    }
    const index = Math.floor(Math.random() * openSquares.length);
    return openSquares[index];
}

const resetGame = () => {
    isCpuTurn = false;
    toggleAttribute(getById("tikTacToeHome"), "nodisplay");
    toggleAttribute(getById("tikTacToeBoard"), "nodisplay");
    const allSquares = document.getElementsByClassName("tictactoe");
    for(let i = 0; i < allSquares.length; i++){
        allSquares[i].classList.remove("x");
        allSquares[i].classList.remove("o");
    }
}

const makeCpuSelection = square => {
    isCpuTurn = false;
    getById(square).classList.add("o");
}

const playerScore = ply => {
    isCpuTurn = false;
    if(ply === "ply"){
        tttScore.wins = tttScore.wins + 1;
    } else {
        tttScore.losses = tttScore.losses + 1;
    }
    setTicTacToeScore(tttScore);
    setTimeout(() => {
        resetGame();
    }, 2000);
}

const makeComputerMove = () => {
    const cpuScoreId = getScoringId(getOScoringChances());
    const plyScoreId = getScoringId(getXScoringChances());
    if(cpuScoreId){
        makeCpuSelection(`${cpuScoreId}`);
        playerScore("cpu");
    } else if(plyScoreId){
        makeCpuSelection(`${plyScoreId}`);
    } else {
        makeCpuSelection(getRandomBox());
    }
}

const selectSquare = id => {
    if(!isCpuTurn && !hasXorO(id)){
        getById(id).classList.add("x");
        if(hasXScored()){
            playerScore("ply");
        } else if(allBoxesTaken()){
            setTimeout(() => {
                resetGame();
            }, 2000);
        } else {
            isCpuTurn = true;
            setTimeout(() => {
                makeComputerMove();
            }, 1000);
        }
    }
}

const showDirections = () => {
    const gameDirections = getById("gameDirections");
    toggleAttribute(gameDirections, "nodisplay");
    const tikTacToeHome = getById("tikTacToeHome");
    toggleAttribute(tikTacToeHome, "nodisplay");
}

const startGame = () => {
    const gameDirections = getById("gameDirections");
    toggleAttribute(gameDirections, "nodisplay");
    const tikTacToeBoard = getById("tikTacToeBoard");
    toggleAttribute(tikTacToeBoard, "nodisplay");
}

const setTicTacToeScore = score => {
    const ticTacToeScore = localStorage.getItem(tttKey);
    if(!ticTacToeScore){
        localStorage.setItem(tttKey, JSON.stringify({wins: 0, losses: 0}));
    }
    if(score){
        localStorage.setItem(tttKey, JSON.stringify(score));
    }
    tttScore = JSON.parse(localStorage.getItem(tttKey));
    getById("tictactoeScore").innerText = `${tttScore.wins}/${tttScore.losses}`;
}

setTicTacToeScore();
