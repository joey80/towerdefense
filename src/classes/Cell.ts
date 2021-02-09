import GameObject from './GameObject';

interface Cell {
  config: GameObject;
  height: number;
  width: number;
  x: number;
  y: number;
}

class Cell extends GameObject implements Cell {
  constructor(config: GameObject, x: number, y: number, size: number) {
    super(config);
    this.config = config;
    this.height = size;
    this.width = size;
    this.x = x;
    this.y = y;
  }
}

export default Cell;
