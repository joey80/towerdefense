import GameObject from './GameObject';

type ProjectileType = {
  config: GameObject;
  power: number;
  size: number;
  speed: number;
  x: number;
  y: number;
};

interface Projectile extends GameObject, ProjectileType {}

class Projectile extends GameObject {
  constructor({ config, x, y }: Omit<ProjectileType, 'power' | 'size' | 'speed'>) {
    super(config);
    this.power = 20;
    this.size = 10;
    this.speed = 4;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.x += this.speed;
  }
}

export type { ProjectileType };
export default Projectile;
