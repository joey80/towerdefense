interface Mouse {
  canvas: HTMLCanvasElement;
  canvasPosition: DOMRect;
  height: number;
  width: number;
  x: number;
  y: number;
}

class Mouse implements Mouse {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasPosition = canvas.getBoundingClientRect();
    this.height = 0.1;
    this.width = 0.1;
    this.x = 0;
    this.y = 0;
  }

  start() {
    this.canvas.addEventListener('mousemove', (event) => {
      this.x = event.x - this.canvasPosition.left;
      this.y = event.y - this.canvasPosition.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.x = 0;
      this.y = 0;
    });

    window.addEventListener('resize', () => {
      this.canvasPosition = this.canvas.getBoundingClientRect();
    });
  }
}

export default Mouse;
