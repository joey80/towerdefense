import GameObject, { GOTypes } from './GameObject';

type TextTypes = {
  color?: string;
  config: GOTypes;
  height: number;
  size?: number;
  text: string;
  width: number;
  x: number;
  y: number;
};

interface Text extends GOTypes, TextTypes {}

class Text extends GameObject implements Text {
  constructor({ config, text, size = 30, color, height, width, x, y }: TextTypes) {
    super(config);
    this.color = color;
    this.height = height;
    this.size = size;
    this.text = text;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  draw() {
    // text
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.color || 'gold';
    this.ctx.font = `${this.size}px Arial`;
    this.ctx.fillText(this.text, this.x, this.y);

    // rect for debugging
    this.ctx.strokeStyle = 'transparent';
    this.ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

export type { TextTypes };
export default Text;
