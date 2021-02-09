import Cell from './Cell';
import GameObject from './GameObject';
import { collision } from '../util';

interface GameGrid extends GameObject {
  cellGap: number;
  cellSize: number;
  config: GameObject;
  gameGrid: Array<Cell>;
  objectSize: number;
}

class GameGrid extends GameObject implements GameGrid {
  constructor(config: GameObject, cellSize: number, objectSize: number, cellGap: number) {
    super(config);
    this.cellGap = cellGap;
    this.cellSize = cellSize;
    this.config = config;
    this.gameGrid = [];
    this.objectSize = objectSize;
  }

  createGrid() {
    for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        this.gameGrid.push(new Cell(this.config, x, y, this.objectSize));
      }
    }
  }

  drawObjects() {
    this.gameGrid.map((elm) => {
      // debugging grid
      // this.ctx.strokeStyle = 'green';
      // this.ctx.strokeRect(elm.x, elm.y, elm.width, elm.height);
      if (collision(elm, this.mouse)) {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(elm.x, elm.y, elm.width, elm.height);
      }
    });
  }
}

export default GameGrid;
