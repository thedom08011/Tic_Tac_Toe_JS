// tableau qui garde les données de la grille
let boardData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

// Constantes pour les joueurs
const PLAYER_ONE = 1;
const PLAYER_TWO = -1;

let currentPlayer = PLAYER_ONE;
let gameOver = false;

let score = 0;

// mettre les carrés dans le DOM
const cellElements = document.querySelectorAll(".cell");

// ajouter un event listener à chaque case 
cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

// Fonction pour placer le marqueur du joueur courant et vérifier le résultat
function placeMarker(index) {
    if (gameOver) return;

    let col = index % 3;
    let row = Math.floor(index / 3);

    if (boardData[row][col] === 0 && gameOver === false) {
        boardData[row][col] = currentPlayer;
        drawMarkers();

        if (checkResult()) {
            endGame(currentPlayer);
        } else {
            currentPlayer = (currentPlayer === PLAYER_ONE) ? PLAYER_TWO : PLAYER_ONE;
            if (checkTie()) {
                tieGame();
            }
        }
    }
}

// Fonction pour dessiner les marqueurs sur le DOM en fonction de boardData
function drawMarkers() {
    cellElements.forEach((cell, index) => {
        let col = index % 3;
        let row = Math.floor(index / 3);
    
		 // Ajout de classes appropriées en fonction du joueur dans la cellule
        if (boardData[row][col] === PLAYER_ONE) {
            cell.classList.add("cross");
        } else if (boardData[row][col] === PLAYER_TWO) {
            cell.classList.add("circle");
        }
    });
}

//fonction pour vérifier les resultats
function checkResult() {
    for (let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];

        if (rowSum === 3 || colSum === 3 || checkDiagonals() === PLAYER_ONE) {
            return true;
        } else if (rowSum === -3 || colSum === -3 || checkDiagonals() === PLAYER_TWO) {
            return true;
        }
    }
    return false;
}

// Fonction pour vérifier les victoires diagonales
function checkDiagonals() {
    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];

    if (diagonalSum1 === 3) {
        return PLAYER_ONE;
    } else if (diagonalSum1 === -3) {
        return PLAYER_TWO;
    } else if (diagonalSum2 === 3) {
        return PLAYER_ONE;
    } else if (diagonalSum2 === -3) {
        return PLAYER_TWO;
    }
    return 0;
}

// Fonction pour vérifier si le jeu est un match nul
function checkTie() {
    return boardData.flat().every(cell => cell !== 0);
}

// Fonction pour gérer les scénarios de match nul
function tieGame() {
    console.log("Match nul");
    gameOver = true;
	const resultElement = document.getElementById("result");
	resultElement.innerText = "it's a tie !";

}

// Fonction pour gérer la fin du jeu et annoncer le gagnant
function endGame(winner) {
    console.log(`Player ${winner === PLAYER_ONE ? 1 : 2} wins!`);
    gameOver = true;
	const resultElement = document.getElementById("result");
	resultElement.innerText = `Player ${winner === PLAYER_ONE ? 1 : 2} wins!`;
}

