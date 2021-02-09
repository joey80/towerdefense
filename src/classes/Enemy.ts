import Cell from './Cell';
import GameObject from './GameObject';

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

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30);
  }

  update() {
    this.x -= this.movement;
  }
}

export default Enemy;
