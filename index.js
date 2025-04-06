// Get DOM elements
const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const topSection = document.getElementById('topSection');
const highScoreText = document.getElementById('highScoreText');
const currentScoreText = document.getElementById('currentScoreText');


// The game board variables
let boardWidth;
let boardHeight;
let cellWidth;
let cellCount = 20;

// The snake variables
let snakeX;
let snakeY; 
let snakeWidth;
let snakeHeight;

// Some colors
const colorSnake = 'blue';



// Set the board size when the page loads or the window is resized
window.addEventListener('load', setupBoard);
window.addEventListener('resize', setupBoard);


// Calculates and sets the game board size
function setupBoard() {
	// Board
	boardHeight = Math.min(window.innerHeight, window.innerWidth) * 0.9 - topSection.offsetHeight;
	boardWidth = boardHeight; // Make the board square

	gameBoard.height = boardHeight; // Set the board height and width
	gameBoard.width = boardWidth; // Make the board square

	// Control the game board width for bigger screens
	const maxWidth = 1111;
	if (gameBoard.width > maxWidth) {
		gameBoard.width = gameBoard.height = maxWidth;
	}

	cellWidth = gameBoard.width / cellCount; // Calculate cell width


	// Snake
	snakeX = cellWidth * 2;
	snakeY = cellWidth * 5;
	snakeWidth = snakeHeight = cellWidth;
}


window.addEventListener('load', () => {
	context.fillStyle = colorSnake;
	context.fillRect(snakeX, snakeY, snakeWidth, snakeHeight);
});