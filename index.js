const gameBoard = document.getElementById('gameBoard');
const contex = gameBoard.getContext('2d');
const topSection = document.getElementById('topSection');
const highScoreText = document.getElementById('highScoreText');
const currentScoreText = document.getElementById('currentScoreText');


// board
let boardSize;
let cellWidth;
let rows;
let columns;


// set the board size
window.addEventListener('load', setBoard);
window.addEventListener('resize', setBoard);


function setBoard() {
	boardSize = window.innerHeight * 0.9 - topSection.offsetHeight;
	gameBoard.height = gameBoard.width = boardSize;
}