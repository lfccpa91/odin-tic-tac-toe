let ticTacToe = (function createGameBoard() {
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    let players = [];
    let playcounter = 0;
    let gameover = false;
    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = 0;
            }
        }
        playcounter = 0;
        gameover = false;
    }

    function getPlaycounter() {
        console.log(playcounter);
        return playcounter;
    }

    function pushPlayers(player1, player2) {
        players.push(player1);
        players.push(player2);
    }

    function resetPlayers() {
        players.splice(0,2);
    }

    function updateBoard(row, column){
        console.log("Board updating");
        if(gameBoard[row][column] === 0 && row < 3 && column < 3 && row >= 0 && column >= 0 && gameover === false) {
            gameBoard[row][column] = playcounter % 2 === 0 ? 1 : 2;
            playcounter++;
        } else if (gameover === true) {
            alert("that's game!");
        } else {
            alert("Select a valid quadrant");
        }
    }
    function evaluateBoard() {
        console.log("board being evaluated");
        if(gameBoard[0][0]===gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== 0) {
            gameover = true;
            return gameBoard[0][0];
        } else if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== 0){
            gameover = true;
            return gameBoard[0][2];
        } else {
            for (let k = 0; k < 3; k++) {
                if(gameBoard[k][0] === gameBoard[k][1] && gameBoard[k][1] === gameBoard[k][2] && gameBoard[k][0] !== 0 ) {
                    gameover = true;
                    return gameBoard[k][0];
                } else if(gameBoard[0][k] === gameBoard[1][k] && gameBoard[1][k] === gameBoard[2][k] && gameBoard[0][k] !== 0 ) {
                    gameover = true;
                    return gameBoard[0][k];
                }
            }
            for (let l=0; l<3; l++) {
                for (let m=0; m<3; m++) {
                    if (gameBoard[l][m]===0){
                        return 0;
                    }
                }
            }
            gameover = true;
            return 3;
        }
    }



    function renderGameBoard(playerArray, playerScoreArray) {
        console.log("Board Rendering");
        gridContainer.innerHTML = ""; // Clear the grid container
        let newCell;
        let newImg;
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newCell = document.createElement("div");
                newImg = document.createElement("img");
                if (gameBoard[i][j] === 1) {
                    newCell.classList.add("x");
                    newImg.src = "./images/x.svg";
                } else if (gameBoard[i][j] === 2) {
                    newCell.classList.add("o");
                    newImg.src = "./images/o.svg";
                } else {
                    newCell.classList.add("blank");
                }
                newCell.dataset.row = i;
                newCell.dataset.column = j;
                newCell.appendChild(newImg);    
                gridContainer.appendChild(newCell);
            }
        }
        attachClickListeners();
    }

    function updateScoreboard() {
        console.log("Checking Win Conditions");
        const result = ticTacToe.evaluateBoard();
    
        if (result === 3) {
            // Tie game
            setTimeout(() => {
                alert("It's a tie!");
            }, 100); // Delay the alert to allow rendering
            return;
        } else if (result >= 1) {
            // Player wins
            const winner = players[result - 1];
            winner.upScore();
            pOneScore.textContent = players[0].getScore();
            pTwoScore.textContent = players[1].getScore();
    
            setTimeout(() => {
                alert(`${winner.name} wins!`);
            }, 100); // Delay the alert to allow rendering
        }
    }


    return {gameBoard, resetBoard, updateBoard, evaluateBoard, getPlaycounter, renderGameBoard, pushPlayers, resetPlayers, updateScoreboard} ;
})();

function attachClickListeners() {
    let tttBoard = document.querySelectorAll("div#gameboard div");
    tttBoard.forEach((item) => {
        item.addEventListener("click", () => {
            ticTacToe.updateBoard(parseInt(item.dataset.row), parseInt(item.dataset.column));
            ticTacToe.renderGameBoard();
            ticTacToe.evaluateBoard();
            ticTacToe.updateScoreboard();
        });
    });
}

function createPlayer(name) {
    let playerScore = 0;
    let marker = "";
    function upScore() {
        return playerScore++;
    }
    function resetScore() {
        playerScore = 0;
    }
    function getScore() {
        return playerScore;
    }
    console.log(`created player ${name}`);
    return {name, getScore, upScore, resetScore}
}

const startButton = document.querySelector("#StartButton");
const resetButton = document.querySelector("#ResetButton");
const pONeInput = document.querySelector("#player1");
const pTwoInput = document.querySelector("#player2");
const pOneScore = document.querySelector("#player1score");
const pTwoScore = document.querySelector("#player2score");
const player1header = document.querySelector("#player1header");
const player2header = document.querySelector("#player2header");
const gridContainer = document.querySelector("#gameboard");

startButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("clicked start button");
    ticTacToe.resetBoard();
    ticTacToe.resetPlayers();
    const playerOne = createPlayer(document.querySelector("input#player1").value);
    player1header.textContent = document.querySelector("input#player1").value;
    player2header.textContent = document.querySelector("input#player2").value;
    const playerTwo = createPlayer(document.querySelector("input#player2").value);
    pOneScore.textContent = "0";
    pTwoScore.textContent = "0";
    ticTacToe.pushPlayers(playerOne, playerTwo);
    ticTacToe.renderGameBoard(); // Pass variables
});

resetButton.addEventListener("click", () => {
    ticTacToe.resetBoard();
    ticTacToe.renderGameBoard();
});

