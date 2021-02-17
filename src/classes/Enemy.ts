import Character, { CharacterTypes } from './Character';
import { Text } from './Factory';

type EnemyTypes = {
  health: number;
  maxHealth: number;
  movement: number;
  speed: number;
};

interface Enemy extends Character, CharacterTypes, EnemyTypes {}

class Enemy extends Character implements Enemy {
  constructor({ config, height, width, x, y }: CharacterTypes) {
    super({ config, height, width, x, y });
    this.config = config;
    this.health = 100;
    this.height = height;
    this.maxHealth = this.health;
    this.speed = 0.35;
    this.movement = this.speed;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.drawBody();
    this.drawText();
  }

  drawBody() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    Text({
      config: this.config,
      text: `${Math.floor(this.health)}`,
      color: 'black',
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    });
  }

  update() {
    this.x -= this.movement;
  }
}

export type { EnemyTypes };
export default Enemy;
