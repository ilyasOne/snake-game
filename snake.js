// Get the canvas element
let canvas = document.getElementById("game");
// Get the context for the canvas
let context = canvas.getContext("2d");

// Define the size of each square (box) on the canvas
let box = 32;
// Initialize the snake as an array of objects with x and y coordinates
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Set the initial direction of the snake
let direction = "right";

// Set the initial score
let score = 0;

// Create the food object with random x and y coordinates
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// Create an array of obstacles
let obstacles = [
  { x: 3 * box, y: 3 * box },
  { x: 5 * box, y: 7 * box },
  { x: 9 * box, y: 4 * box },
  // Add more obstacles as needed
];

// Function to draw the game background
function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Function to draw the obstacles
function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    context.fillStyle = "blue";
    context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
  }
}

// Function to draw the food
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

//Function to draw the score
function drawScore() {
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, box, box);
}

// Event listener to update the direction based on the arrow key pressed
document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Function to start and update the game
function startGame() {

  // Wrap the snake around to the other side of the board if it hits the edge
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  // Check if the snake has collided with itself
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert("Game Over :(");
    }
  }

  createBG();
  drawScore();
  createSnake();
  drawObstacles();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Update the position of the snake based on the direction
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  // Check if the snake has eaten the food
  if (snakeX != food.x || snakeY != food.y) {
    // Remove the last segment of the snake
    snake.pop();
  } else {
    // Generate a new food item
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    score++
  }

  // Create a new head for the snake
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // Add the new head to the beginning of the snake
  snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);
