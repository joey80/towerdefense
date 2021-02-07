import Cell from './Cell';
import GameObject from './GameObject';
import { collision } from '../util';

interface GameGrid extends GameObject {
  cellSize: number;
  gameGrid: Array<Cell>;
  gameObject: GameObject;
  objectSize: number;
}

class GameGrid implements GameGrid {
  constructor(gameObject: GameObject, cellSize: number, objectSize: number) {
    this.cellSize = cellSize;
    this.gameGrid = [];
    this.gameObject = gameObject;
    this.objectSize = objectSize;
  }

  createGrid() {
    for (let y = this.cellSize; y < this.gameObject.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.gameObject.canvas.width; x += this.cellSize) {
        this.gameGrid.push(new Cell(x, y, this.objectSize));
      }
    }
  }

  drawObjects() {
    this.gameGrid.map((elm) => {
      if (collision(elm, this.gameObject.mouse)) {
        this.gameObject.ctx.strokeStyle = 'black';
        this.gameObject.ctx.strokeRect(elm.x, elm.y, elm.width, elm.height);
      }
    });
  }
}

export default GameGrid;
