import { CharacterTypes } from '../Character';
import FiringDefender, { FiringDefenderTypes } from './FiringDefender';
import { Text } from '../Factory';

interface RedDefender extends FiringDefenderTypes {}

class RedDefender extends FiringDefender implements RedDefender {
  constructor({ config, height, width, x, y }: CharacterTypes) {
    super({ config, height, projectileType: 'black', width, x, y });
  }

  drawBody() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    Text({
      color: 'white',
      config: this.config,
      text: `${Math.floor(this.health)}`,
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    });
  }
}

export default RedDefender;
