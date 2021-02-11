import GameObject from './GameObject';

type CharacterTypes = {
  config: GameObject;
  height: number;
  width: number;
  x: number;
  y: number;
};

interface Character extends GameObject, Omit<CharacterTypes, 'config'> {}

class Character extends GameObject implements Character {
  constructor({ config, height, width, x, y }: CharacterTypes) {
    super(config);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}

export type { CharacterTypes };
export default Character;
