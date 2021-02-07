import Cell from './Cell';
import GameObject from './GameObject';

interface Enemy extends Cell, GameObject {
  gameObject: GameObject;
  health: number;
  maxHealth: number;
  speed: number;
  movement: number;
}

class Enemy implements Enemy {
  constructor(gameObject: GameObject, verticalPosition: number, size: number) {
    this.gameObject = gameObject;
    this.health = 100;
    this.height = size;
    this.maxHealth = this.health;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.width = size;
    this.x = gameObject.canvas.width;
    this.y = verticalPosition;
  }

  draw() {
    this.gameObject.ctx.fillStyle = 'red';
    this.gameObject.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.gameObject.ctx.fillStyle = 'black';
    this.gameObject.ctx.font = '30px Arial';
    this.gameObject.ctx.fillText(`${Math.floor(this.health)}`, this.x + 15, this.y + 30);
  }

  update() {
    this.x -= this.movement;
  }
}

export default Enemy;
