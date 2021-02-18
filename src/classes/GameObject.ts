import Cell from './Cell';
import Defender from './Defender';
import Enemy from './Enemy';
import Mouse from './Mouse';
import Projectile from './Projectile';
import Resource from './Resource';

type GameObjectType = Cell | Defender | Enemy | Mouse | Projectile | Resource;

type GOTypes = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: Mouse;
};

interface GameObject extends GOTypes {
  config: GOTypes;
}

class GameObject implements GOTypes {
  constructor({ canvas, ctx, mouse }: GOTypes) {
    this.canvas = canvas;
    this.config = { canvas, ctx, mouse };
    this.ctx = ctx;
    this.mouse = mouse;
  }
}

export type { GameObjectType, GOTypes };
export default GameObject;
