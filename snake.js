import { canvas } from "./utils/getCanvas.js";

export default class Snake {
  constructor(x, y, color = "white") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = 15;
  }

  static gameOver = false;
  static speed = 15;
  static direction = { x: this.speed, y: 0 };
  static score = 0;

  static setDirection = (keyCode) => {
    let { x, y } = this.direction;
    const speed = this.speed;

    switch (keyCode) {
      case 38:
        if (y > 0) break;
        [x, y] = [0, -speed];
        break;
      case 40:
        if (y < 0) break;
        [x, y] = [0, speed];
        break;
      case 37:
        if (x > 0) break;
        [x, y] = [-speed, 0];
        break;
      case 39:
        if (x < 0) break;
        [x, y] = [speed, 0];
        break;
    }

    this.direction = { x, y };
  };

  static movement = (snake) => {
    if (!snake[0]) return;

    const { x, y } = this.direction;

    const tail = snake.pop();

    if (snake[0]) [tail.x, tail.y] = [snake[0].x, snake[0].y];

    tail.x += x;
    tail.y += y;

    snake.unshift(tail);
  };

  static foodCollision = (head, food) => {
    const { x, y, width } = head;

    const isFoodEaten =
      x + width > food.x &&
      x < food.x + food.r &&
      y + width > food.y &&
      y < food.y + width;

    if (isFoodEaten) this.score += food.points;

    return isFoodEaten;
  };

  static wallCollision = (snake) => {
    if (!snake[0]) return;

    const direction = this.direction;
    let { x, y, width } = snake[0];

    if (x + width > canvas.width) x = 0;
    else if (x < 0) x = canvas.width - width;
    else if (y + width > canvas.height) y = 0;
    else if (y < 0) y = canvas.height;

    [snake[0].x, snake[0].y] = [x, y];
  };

  static snakeCollision = (snake) => {
    if (!snake[0]) return;

    const { x, y, width } = snake[0];

    for (let i = 1; i < snake.length; i++) {
      const isCollision =
        x + width > snake[i].x &&
        x < snake[i].x + width &&
        y + width > snake[i].y &&
        y < snake[i].y + width;

      if (isCollision) {
        this.gameOver = true;
        this.direction = { x: 0, y: 0 };
        snake[0].color = "red";
        break;
      }
    }
  };

  static grow = (snake) => {
    if (!snake[0]) return;

    const { x, y } = this.direction;
    return { x: x + snake[0].x, y: y + snake[0].y };
  };
}

window.addEventListener("keydown", (e) => Snake.setDirection(e.keyCode));
