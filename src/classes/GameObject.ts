import Cell from './Cell';
import Defender from './Defender/Defender';
import Enemy from './Enemy';
import Mouse from './Mouse';
import Projectile from './Projectile';
import Resource from './Resource';
import Text from './Text';

type Generic = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type GameObjectType = Cell | Defender | Enemy | Generic | Mouse | Projectile | Resource | Text;

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

export type { GameObjectType, Generic, GOTypes };
export default GameObject;
