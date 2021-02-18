import GameObject, { GOTypes } from './GameObject';

type TextTypes = {
  color?: string;
  config: GOTypes;
  size?: number;
  text: string;
  x: number;
  y: number;
};

interface Text extends GOTypes, TextTypes {}

class Text extends GameObject implements Text {
  constructor({ config, text, size = 30, color, x, y }: TextTypes) {
    super(config);
    this.text = text;
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.color || 'gold';
    this.ctx.font = `${this.size}px Arial`;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

export type { TextTypes };
export default Text;
