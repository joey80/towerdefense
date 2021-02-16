import { CharacterTypes } from './Character';
import GameObject from './GameObject';
import { Text } from './Factory';

interface Resource extends CharacterTypes {
  amount: number;
  amounts: Array<number>;
  cellSize: number;
  config: GameObject;
}

class Resource extends GameObject implements Resource {
  constructor({ config, amounts, cellSize }: Pick<Resource, 'config' | 'amounts' | 'cellSize'>) {
    super(config);
    this.config = config;
    this.x = Math.random() * (config.canvas.width - cellSize);
    this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.amount = amounts[Math.floor(Math.random() * amounts.length)];
  }

  draw() {
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    Text({
      config: this.config,
      text: `${this.amount}`,
      size: 20,
      color: 'black',
      vector: { x: this.x + 15, y: this.y + 25 },
    });
  }
}

export default Resource;
