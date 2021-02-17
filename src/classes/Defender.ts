import Character, { CharacterTypes } from './Character';
import { Text } from './Factory';

type DefenderTypes = {
  health: number;
};

interface Defender extends Character, CharacterTypes, DefenderTypes {}

class Defender extends Character implements Defender {
  constructor({ config, height, width, x, y }: CharacterTypes) {
    super({ config, height, width, x, y });
    this.config = config;
    this.health = 100;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.drawBody();
    this.drawText();
  }

  drawBody() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawText() {
    Text({
      config: this.config,
      text: `${Math.floor(this.health)}`,
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    });
  }
}

export type { DefenderTypes };
export default Defender;
