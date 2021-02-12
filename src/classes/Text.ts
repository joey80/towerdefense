import GameObject from './GameObject';

type TextTypes = {
  color: string;
  config: GameObject;
  size: number;
  text: string;
  vector: { x: number; y: number };
};

interface Text extends GameObject, TextTypes {}

class Text extends GameObject implements Text {
  constructor({ config, text, size = 30, color = 'gold', vector }: TextTypes) {
    super(config);
    this.text = text;
    this.size = size;
    this.color = color;
    this.vector = vector;
  }

  draw() {
    const { x, y } = this.vector;
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.size}px Arial`;
    this.ctx.fillText(this.text, x, y);
  }
}

export type { TextTypes };
export default Text;
