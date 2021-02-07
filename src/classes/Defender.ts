import Cell from './Cell';
import GameObject from './GameObject';

interface Defender extends Cell, GameObject {
  gameObject: GameObject;
  health: number;
  projectiles: Array<any>;
  shooting: boolean;
  timer: number;
}

class Defender implements Defender {
  constructor(gameObject: GameObject, x: number, y: number, size: number) {
    this.gameObject = gameObject;
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
    this.gameObject.ctx.fillStyle = 'blue';
    this.gameObject.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.gameObject.ctx.fillStyle = 'gold';
    this.gameObject.ctx.font = '30px Arial';
    this.gameObject.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30);
  }
}

export default Defender;
