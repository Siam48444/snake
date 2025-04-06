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
window.addEventListener('load', setGameBoard);
window.addEventListener('resize', setGameBoard);


// Calculates and sets the game board size based on the window height
function setGameBoard() {
	boardHeight = Math.min(window.innerHeight, window.innerWidth) * 0.9 - topSection.offsetHeight;
	boardWidth = boardHeight; // Make the board square

	gameBoard.height = boardHeight; // Set the board height and width
	gameBoard.width = boardWidth; 
}
