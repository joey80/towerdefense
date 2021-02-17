import GameObject from './GameObject';
import { CharacterTypes } from './Character';

interface ProjectileType extends CharacterTypes {
  power: number;
  size: number;
  speed: number;
}

interface Projectile extends GameObject, ProjectileType {}

class Projectile extends GameObject implements Projectile {
  constructor({ config, height, width, x, y }: Omit<ProjectileType, 'power' | 'size' | 'speed'>) {
    super(config);
    this.height = height;
    this.power = 20;
    this.speed = 8;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.height, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.x += this.speed;
  }
}

export type { ProjectileType };
export default Projectile;
