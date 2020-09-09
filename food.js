import generateCordinates from "./utils/generateCordinates.js";
import { canvas } from "./utils/getCanvas.js";

export default class Food {
  constructor(points) {
    const { x, y } = generateCordinates(canvas.width, canvas.height);

    this.x = x;
    this.y = y;
    this.r = 10;
    this.points = points;
    this.color = "red";
  }
}
