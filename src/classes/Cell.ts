import GameObject, { GOTypes } from './GameObject';

interface Cell {
  config: GOTypes;
  height: number;
  width: number;
  x: number;
  y: number;
}

class Cell extends GameObject implements Cell {
  constructor(config: GOTypes, x: number, y: number, size: number) {
    super(config);
    this.config = config;
    this.height = size;
    this.width = size;
    this.x = x;
    this.y = y;
  }
}

export default Cell;
