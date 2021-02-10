import Cell from './Cell';
import GameObject from './GameObject';
import { TextObj } from './Factory';

interface Defender extends Cell, GameObject {
  health: number;
  projectiles: Array<any>;
  shooting: boolean;
  timer: number;
}

class Defender extends GameObject implements Defender {
  constructor(config: GameObject, x: number, y: number, size: number) {
    super(config);
    this.config = config;
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

  drawBody() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    TextObj({
      config: this.config,
      size: 30,
      color: 'gold',
      text: `${Math.floor(this.health)}`,
      vector: { x: this.x + 15, y: this.y + 30 },
    });
  }

  draw() {
    this.drawBody();
    this.drawText();
  }
}

export default Defender;
