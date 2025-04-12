import { eatSound, hitSound, playSound } from './assets/sounds/sounds.js'



const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const topSection = document.getElementById('topSection');
const highScoreText = document.getElementById('highScoreText');
const currentScoreText = document.getElementById('currentScoreText');
const popup = document.getElementById('popup');
const restartButton = document.getElementById('restartButton');
const highScorePopup = document.getElementById('highScorePopup');
const currentScorePopup = document.getElementById('currentScorePopup');


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
let snakeVelocityX;
let snakeVelocityY;
let snakeBody;
let snakeSpeed = 60; 

// The food variables
let foodX;
let foodY;
let foodWidth;
let foodHeight;

// Score variables
let currentScore;
let highScore = localStorage.getItem('highScoreSnake') || 0;

// Some colors
const colorSnake = '#000000';
const colorFood = '#ee0000';

// Others
let gameOver;

// Touchscreen
let touchStartX = 0;
let touchStartY = 0;



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

	// Style the popup section
	popup.style.width = `${gameBoard.width}px`;
	popup.style.height = `${gameBoard.height + topSection.offsetHeight}px`;
}


// Set up the main game logics and functions
window.addEventListener('load', () => {
	// Initialize the game
	initGame();
	restartButton.addEventListener('click', initGame);

	// Make the game interactive 
	setInterval(update, 5000 / snakeSpeed);
	document.addEventListener('keydown', moveSnake);


	// Touchscreen
	document.addEventListener('touchstart', (e) => {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	});

	document.addEventListener('touchend', (e) => {
		const touchEndX = e.changedTouches[0].clientX;
		const touchEndY = e.changedTouches[0].clientY;

		const diffX = touchEndX - touchStartX;
		const diffY = touchEndY - touchStartY;

		if (Math.abs(diffX) > Math.abs(diffY)) {
			// Horizontal swipe
			if (diffX > 0 && snakeVelocityX !== -1) {
				snakeVelocityX = 1;
				snakeVelocityY = 0;
			} 
			if (diffX < 0 && snakeVelocityX !== 1) {
				snakeVelocityX = -1;
				snakeVelocityY = 0;
			}
		}
		else {
			// Vertical swipe
			if (diffY > 0 && snakeVelocityY !== -1) {
				snakeVelocityX = 0;
				snakeVelocityY = 1;
			} 
			if (diffY < 0 && snakeVelocityY !== 1) {
				snakeVelocityX = 0;
				snakeVelocityY = -1;
			}
		}
	});
});


// Initialize the game
function initGame() {
	// Initialize snake's position and size
	snakeX = cellWidth * 5;
	snakeY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	snakeWidth = snakeHeight = cellWidth;

	// Initialize food's position and size
	foodX = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodY = Math.floor(cellCount / 2) * cellWidth - cellWidth;
	foodWidth = foodHeight = cellWidth;

	// Start with a small snake body
	snakeBody = []; // Clear the previous snake body
	snakeBody.unshift(
		[foodX - cellWidth, foodY - cellWidth], 
		[foodX - cellWidth * 2, foodY - cellWidth * 2]
	);

	// Draw the snake
	context.fillStyle = colorSnake;
	context.fillRect(snakeX, snakeY, snakeWidth, snakeHeight);

	// Draw the food
	context.fillStyle = colorFood;
	context.fillRect(foodX, foodY, foodWidth, foodHeight);

	// Reset the other properties 
	snakeVelocityX = 0;
	snakeVelocityY = 0;
	gameOver = false
	
	currentScore = 0;
	currentScoreText.innerText = currentScore;
	highScoreText.innerText = highScore;

	popup.classList.remove('popupOpen');
}


// Update the snake and food positions
function update() {
	// Return if the game is over
	if (gameOver) return; 

	// Clear the previous frame
	context.clearRect(0, 0, boardWidth, boardHeight);

	// Shift body segments
	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	// Draw the food
	context.fillStyle = colorFood;
	context.fillRect(foodX, foodY, foodWidth, foodHeight);

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

	// Update the food's place if eaten
	if (
		snakeX + snakeWidth > foodX &&
		snakeX < foodX + foodWidth &&
		snakeY + snakeHeight > foodY &&
		snakeY < foodY + foodHeight
	) {
		snakeBody.unshift([snakeX, snakeY]);
		placeFood();
		updateScore();
		playSound(eatSound);
	}

	// Check if the game is over
	checkGameOverConditions();
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
	if (gameOver) return;

	// Move up if not currently moving down
	if (e.code === 'ArrowUp' && snakeVelocityY === 0) {
		snakeVelocityX = 0;
		snakeVelocityY = -1;
	}
	// Move down if not currently moving up
	if (e.code === 'ArrowDown' && snakeVelocityY === 0) {
		snakeVelocityX = 0;
		snakeVelocityY = 1;
	}
	// Move left if not currently moving right
	if (e.code === 'ArrowLeft' && snakeVelocityX === 0) {
		snakeVelocityX = -1;
		snakeVelocityY = 0;
	}
	// Move right if not currently moving left
	if (e.code === 'ArrowRight' && snakeVelocityX === 0) {
		snakeVelocityX = 1;
		snakeVelocityY = 0;
	}
}


// Update the player's scores
function updateScore() {
	// The current score
	currentScore++;
	currentScoreText.innerText = currentScore;

	// The high score
	if (currentScore > highScore) {
		highScore = currentScore;
		highScoreText.innerText = highScore;
		localStorage.setItem('highScoreSnake', highScore);
	}

	// Update the popup scores
	currentScorePopup.innerText = currentScore;
	highScorePopup.innerText = highScore;
}


// Checks if the game is over
function checkGameOverConditions() {
	// Check if the snake crossed the boundary 
	if (
		snakeX < 0 || 
		snakeX + snakeWidth >= boardWidth ||
		snakeY < 0 || 
		snakeY + snakeHeight >= boardHeight
	) {
		triggerGameOver();
		return;
	}

	// Check if the snake has bitten itself 
	// for (let i = 0; i < snakeBody.length; i++) {
	// 	if (
	// 		snakeX === snakeBody[i][0] &&
	// 		snakeY === snakeBody[i][1]
	// 	) {
	// 		gameOver = true;
	// 		if (confirm("Game Over! You bit yourself!\nPress OK to restart.")) {
 //            	initGame();
 //        	}
	// 		return;
	// 	}
	// }
}


// Trigger the game over 
function triggerGameOver() {
	playSound(hitSound);
	gameOver = true;
	popup.classList.add('popupOpen');
}