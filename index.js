// Get DOM elements
const gameBoard = document.getElementById('gameBoard');
const contex = gameBoard.getContext('2d');
const topSection = document.getElementById('topSection');
const highScoreText = document.getElementById('highScoreText');
const currentScoreText = document.getElementById('currentScoreText');


// The game board variables
let boardWidth;
let boardHeight;
let cellWidth;
let rows;
let columns;


// Set the board size when the page loads or the window is resized
window.addEventListener('load', setBoard);
window.addEventListener('resize', setBoard);


// Calculates and sets the game board size based on the window height
function setBoard() {
	boardHeight = Math.min(window.innerHeight, window.innerWidth) * 0.9 - topSection.offsetHeight;
	boardWidth = boardHeight;

	gameBoard.height = boardHeight; 
	gameBoard.width = boardWidth; // Make canvas square
}
