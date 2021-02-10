import Cell from './Cell';
import GameObject from './GameObject';
import { TextObj } from './Factory';

interface Enemy extends Cell, GameObject {
  canvasWidth: number;
  health: number;
  maxHealth: number;
  speed: number;
  movement: number;
}

class Enemy extends GameObject implements Enemy {
  constructor(config: GameObject, verticalPosition: number, size: number) {
    super(config);
    this.config = config;
    this.ctx = config.ctx;
    this.health = 100;
    this.height = size;
    this.maxHealth = this.health;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.width = size;
    this.x = config.canvas.width;
    this.y = verticalPosition;
  }

  drawBody() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    TextObj({
      config: this.config,
      text: `${Math.floor(this.health)}`,
      size: 30,
      color: 'black',
      vector: { x: this.x + 15, y: this.y + 30 },
    });
  }

  draw() {
    this.drawBody();
    this.drawText();
  }

  update() {
    this.x -= this.movement;
  }
}

export default Enemy;
