interface Mouse {
  canvas: HTMLCanvasElement;
  canvasPosition: DOMRect;
  clickedPosition: { x: number; y: number };
  height: number;
  width: number;
  x: number;
  y: number;
}

class Mouse implements Mouse {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasPosition = canvas.getBoundingClientRect();
    this.clickedPosition = { x: 0, y: 0 };
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

    this.canvas.addEventListener('click', (event) => {
      this.clickedPosition = {
        x: event.x - this.canvasPosition.left,
        y: event.y - this.canvasPosition.top,
      };
    });

    window.addEventListener('resize', () => {
      this.canvasPosition = this.canvas.getBoundingClientRect();
    });
  }
}

export default Mouse;
