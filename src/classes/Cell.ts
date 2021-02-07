interface Cell {
  height: number;
  width: number;
  x: number;
  y: number;
}

class Cell implements Cell {
  constructor(x: number, y: number, size: number) {
    this.height = size;
    this.width = size;
    this.x = x;
    this.y = y;
  }
}

export default Cell;
