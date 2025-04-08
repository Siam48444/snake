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
let snakeBody = [];

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
}


// Set up the main game logics and functions
window.addEventListener('load', () => {
	// Initialize snake's position and size
	snakeX = cellWidth * 5;
	snakeY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	snakeWidth = snakeHeight = cellWidth;

	// Initialize food's position and size
	foodX = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodWidth = foodHeight = cellWidth;

	// Make the game interactive 
	setInterval(update, snakeSpeed);
	document.addEventListener('keydown', moveSnake);
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

	// Print the snake body segments
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], snakeWidth, snakeHeight);
	}

	// Shift body segments
	for (let i = snakeBody.length; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}

	// Draw the food
	context.fillStyle = colorFood;
	context.fillRect(foodX, foodY, foodWidth, foodHeight);

	// Update the food's place if eaten
	if (
		snakeX + snakeWidth > foodX &&
		snakeX < foodX + foodWidth &&
		snakeY + snakeWidth > foodY &&
		snakeY < foodY + foodWidth
	) {
		snakeBody.push([foodX, foodY]);
		placeFood();
	}
}


// Place the food at a random position
function placeFood() {
	// Generate random cell index for X and Y
	const randomColumn = Math.floor(Math.random() * cellCount);
	const randomRow = Math.floor(Math.random() * cellCount);

	// Place the food in the correct position
	foodX = randomColumn * cellWidth;
	foodY = randomRow * cellWidth;
}


// Move the snake based on arrow key presses
function moveSnake(e) {
	// Move up if not currently moving down
	if (e.code === 'ArrowUp' && snakeVelocityY !== 1) {
		snakeVelocityX = 0;
		snakeVelocityY = -1;
	}
	// Move down if not currently moving up
	if (e.code === 'ArrowDown' && snakeVelocityY !== -1) {
		snakeVelocityX = 0;
		snakeVelocityY = 1;
	}
	// Move left if not currently moving right
	if (e.code === 'ArrowLeft' && snakeVelocityX !== 1) {
		snakeVelocityX = -1;
		snakeVelocityY = 0;
	}
	// Move right if not currently moving left
	if (e.code === 'ArrowRight' && snakeVelocityX !== -1) {
		snakeVelocityX = 1;
		snakeVelocityY = 0;
	}
}
