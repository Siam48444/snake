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
let cellCount = 30;

// The snake variables
let snakeX;
let snakeY; 
let snakeWidth;
let snakeHeight;
let snakeVelocityX = 0;
let snakeVelocityY = 0;
let snakeSpeed = 69; // The lesser the faster speed

// The food variables
let foodX;
let foodY;
let foodWidth;
let foodHeight;

// Some colors
const colorSnake = '#0a57d1';
const colorFood = '#e84225';



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

	// Apply calculated dimensions to the canvas
	gameBoard.height = boardHeight;
	gameBoard.width = boardWidth;

	// Limit board size on larger screens
	const maxWidth = 1111;
	if (gameBoard.width > maxWidth) {
		gameBoard.width = gameBoard.height = maxWidth;
	}

	// Calculate size of each cell
	cellWidth = gameBoard.width / cellCount;

	// Initialize snake's position and size
	snakeX = cellWidth * 5;
	snakeY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	snakeWidth = snakeHeight = cellWidth;

	// Initialize food's position and size
	foodX = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodWidth = foodHeight = cellWidth;
}


// Set up the main game logics and functions
window.addEventListener('load', () => {
	placeFood();

	document.addEventListener('keydown', moveSnake);
	setInterval(update, snakeSpeed);
});


// Update the snake and food positions
function update() {
	// Clear the previous frame
	context.clearRect(0, 0, boardWidth, boardHeight);

	// Set the snake's movement
	snakeX += snakeVelocityX * cellWidth;
	snakeY += snakeVelocityY * cellWidth;

	// Draw the snake
	context.fillStyle = colorSnake;
	context.fillRect(snakeX, snakeY, snakeWidth, snakeHeight);

	// Draw the food
	context.fillStyle = colorFood;
	context.fillRect(foodX, foodY, foodWidth, foodHeight);

	// Update the food's place if eaten
	if (snakeX === foodX && snakeY === foodY) {
		placeFood();
	}
}


// Place the food at a random position
function placeFood() {
	// Generate random cell index for X and Y
	const randomColumn = Math.floor(Math.random() * cellCount);
	const randomRow = Math.floor(Math.random() * cellCount);

	// Convert cell index to pixel position
	foodX = randomColumn * cellWidth;
	foodY = randomRow * cellWidth;
}


// Move the snake with key-press
function moveSnake(e) {
	if (e.code === 'ArrowUp' && snakeVelocityY !== 1) {
		snakeVelocityX = 0;
		snakeVelocityY = -1;
	}
	if (e.code === 'ArrowDown' && snakeVelocityY !== -1) {
		snakeVelocityX = 0;
		snakeVelocityY = 1;
	}
	if (e.code === 'ArrowLeft' && snakeVelocityX !== 1) {
		snakeVelocityX = -1;
		snakeVelocityY = 0;
	}
	if (e.code === 'ArrowRight' && snakeVelocityX !== -1) {
		snakeVelocityX = 1;
		snakeVelocityY = 0;
	}
}