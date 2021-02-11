import GameObject from './GameObject';

type ProjectilesType = {
  config: GameObject;
  power: number;
  size: number;
  speed: number;
  x: number;
  y: number;
};

interface Projectiles extends GameObject, ProjectilesType {}

class Projectiles extends GameObject {
  constructor({ config, x, y }: ProjectilesType) {
    super(config);
    this.config = config;
    this.power = 20;
    this.size = 10;
    this.speed = 5;
    this.x = x;
    this.y, y;
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

export default Projectiles;
