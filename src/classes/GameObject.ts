import Mouse from './Mouse';

interface GameObject {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: Mouse;
}

class GameObject {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: Mouse) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
  }
}

export default GameObject;
