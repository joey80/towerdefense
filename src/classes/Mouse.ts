interface Mouse {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  x: number;
  y: number;
}

class Mouse implements Mouse {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.height = 0.1;
    this.width = 0.1;
    this.x = 0;
    this.y = 0;
  }

  getXPos() {
    return this.x;
  }

  getYPos() {
    return this.y;
  }

  start() {
    this.canvas.addEventListener('mousemove', (event) => {
      const canvasPosition = this.canvas.getBoundingClientRect();
      this.x = event.x - canvasPosition.left;
      this.y = event.y - canvasPosition.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.x = 0;
      this.y = 0;
    });
  }
}

export default Mouse;
