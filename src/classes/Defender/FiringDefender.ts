import Defender from './Defender';
import { CharacterTypes } from '../Character';
import Projectile from '../Projectile';

interface FiringDefenderTypes extends CharacterTypes {
  projectiles: Array<Projectile>;
  projectileType: string;
  shooting: boolean;
  timer: number;
}

interface FiringDefender extends Defender, FiringDefenderTypes {}

class FiringDefender extends Defender implements FiringDefender {
  constructor({
    config,
    height,
    projectileType,
    width,
    x,
    y,
  }: Omit<FiringDefenderTypes, 'power' | 'projectiles' | 'shooting' | 'timer'>) {
    super({ config, height, width, x, y });
    this.config = config;
    this.height = height;
    this.projectiles = [];
    this.projectileType = projectileType;
    this.shooting = false;
    this.timer = 0;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  drawProjectile() {
    if (this.shooting) {
      this.projectiles.map((elm, index) => {
        elm.draw();
        elm.update();

        // if offscreen
        if (elm.x >= this.config.canvas.width - 50) {
          this.projectiles.splice(index, 1);
        }
      });
    }
  }

  update() {
    this.timer++;

    if (this.timer % 100 === 0) {
      this.projectiles.push(
        new Projectile({
          config: this.config,
          height: 10,
          width: 10,
          x: this.x + 50,
          y: this.y + 50,
        })
      );
    }
  }
}

export type { FiringDefenderTypes };
export default FiringDefender;
