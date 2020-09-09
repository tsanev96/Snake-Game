import { ctx } from "./utils/getCanvas.js";
import Draw from "./draw.js";
import Snake from "./snake.js";
import Food from "./food.js";

const playAgainButton = document.getElementById("play-again");
const scoreEl = document.getElementById("score");

const fps = 6;
let then, now, elapsed, fpsInterval;
let food = new Food(1);
const snake = [new Snake(30, 30, "lightgreen")];

function animate() {
  requestAnimationFrame(animate);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    const isGameOver = Snake.gameOver;
    if (isGameOver) return;

    then = now - (elapsed % fpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Draw.body(snake);
    Draw.food(food);
    Snake.movement(snake);
    collision();
  }
}

function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  animate();
}

function collision() {
  Snake.wallCollision(snake);
  Snake.snakeCollision(snake);
  const isFoodEaten = Snake.foodCollision(snake[0], food);

  if (isFoodEaten) {
    console.log("food eaten");
    food = new Food();
    const { x, y } = Snake.grow(snake);
    snake.push(new Snake(x, y));
    scoreEl.innerText = `Score: ${Snake.score}`;
  }
}

startAnimating();

playAgainButton.addEventListener("click", () => (window.location = "/"));
