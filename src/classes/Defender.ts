import Cell from './Cell';
import GameObject from './GameObject';

interface Defender extends Cell, GameObject {
  health: number;
  projectiles: Array<any>;
  shooting: boolean;
  timer: number;
}

class Defender extends GameObject implements Defender {
  constructor(config: GameObject, x: number, y: number, size: number) {
    super(config);
    this.ctx = config.ctx;
    this.health = 100;
    this.height = size;
    this.projectiles = [];
    this.shooting = false;
    this.timer = 0;
    this.width = size;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'gold';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30);
  }
}

export default Defender;
