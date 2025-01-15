/* 
Thinking through the steps to build the Tic Tac Toe game, and how to separate the projects into the appropriate pieces

Create the Board
Create the players
Assign Xs and Os to players
Let the players place their mark on the board
Evaluate the gameboard for a winner
Tally results in a scoreboard
Reset the game board
*/

function createGameBoard() {
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    let playcounter = 0;
    function resetBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = 0;
            }
        }
        playcounter = 0;
    }

    function getPlaycounter() {
        return playcounter;
    }

    function updateBoard(row, column){
        if(gameBoard[row][column] === 0 && row < 3 && column < 3 && row >= 0 && column >= 0) {
            gameBoard[row][column] = playcounter % 2 === 0 ? 1 : 2;
            playcounter++;
        } else {
            alert("Select a valid quadrant");
        }
    }
    function evaluateBoard() {
        if(gameBoard[0][0]===gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== 0) {
            return gameBoard[0][0];
        } else if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== 0){
            return gameBoard[0][2];
        } else {
            for (let k = 0; k < 3; k++) {
                if(gameBoard[k][0] === gameBoard[k][1] && gameBoard[k][1] === gameBoard[k][2] && gameBoard[k][0] !== 0 ) {
                    return gameBoard[k][0]; 
                } else if(gameBoard[0][k] === gameBoard[1][k] && gameBoard[1][k] === gameBoard[2][k] && gameBoard[0][k] !== 0 ) {
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
            return "cat";
        }
    }
    function showBoard() {
        let outputString = "";
        for (let l=0; l<3; l++) {
            for (let m=0; m<3; m++) {
                outputString += `|${gameBoard[l][m]}|`
            }
            outputString +="\n";
        }
        console.log(outputString);
    }


    return {gameBoard, resetBoard, updateBoard, evaluateBoard, showBoard, getPlaycounter} ;
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
    return {name, getScore, upScore, resetScore}
}

function playGame() {
    const playerOne = createPlayer(prompt("Player 1's Name: "));
    const playerTwo = createPlayer(prompt("Player 2's Name: "));
    const playerArray = [playerOne, playerTwo];
    const ticTacToe = createGameBoard();
    while (ticTacToe.evaluateBoard() === 0){
        let row = prompt(`${playerArray[ticTacToe.getPlaycounter() % 2].name}'s move - row?`)*1;
        let col = prompt(`${playerArray[ticTacToe.getPlaycounter() % 2].name}'s move - column?`)*1;
        ticTacToe.updateBoard(row, col);
        ticTacToe.showBoard();
    }
    if (ticTacToe.evaluateBoard() !== "cat") {
        console.log(`${playerArray[ticTacToe.evaluateBoard()-1].name} wins!`);
        playerArray[ticTacToe.evaluateBoard()-1].upScore;
    } else {
        console.log("It's a tie!");
    }
    let answer = prompt("Play again? (Y/N): ");
    if (answer === "Y") {
        playGame();
    }
}

