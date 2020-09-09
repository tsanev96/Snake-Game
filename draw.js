import { ctx } from "./utils/getCanvas.js";

export default class Draw {
  static body(snake) {
    for (let i = 0; i < snake.length; i++) {
      if (i == 0) snake[0].color = "lightgreen";
      else snake[i].color = "white";
      Draw.drawRect(snake[i]);
    }
  }

  static food(food) {
    Draw.drawCircle(food);
  }

  static drawRect({ x, y, width, color }) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, width);
    ctx.strokeRect(x, y, width, width);
  }

  static drawCircle({ x, y, r, color }) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
