const gameBoard = document.getElementById('gameBoard');
const contex = gameBoard.getContext('2d');
const topSection = document.getElementById('topSection');
const highScoreText = document.getElementById('highScoreText');
const currentScoreText = document.getElementById('currentScoreText');


// board
let boardWidth;
let boardHeight;
let cellWidth;
let rows;
let columns;


// set the board size
window.addEventListener('load', setBoard);
window.addEventListener('resize', setBoard);


function setBoard() {
	boardWidth = window.innerHeight * 0.9 - topSection.offsetHeight;
	gameBoard.height = gameBoard.width = boardWidth;
}