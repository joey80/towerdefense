import Cell from './Cell';
import Defender from './Defender';
import Enemy from './Enemy';
import Mouse from './Mouse';

export type GameObjectType = Cell | Defender | Enemy | Mouse;

interface GameObject {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: Mouse;
}

class GameObject {
  constructor(config: GameObject) {
    this.canvas = config.canvas;
    this.ctx = config.ctx;
    this.mouse = config.mouse;
  }
}

export default GameObject;
