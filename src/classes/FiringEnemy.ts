import Enemy from './Enemy';
import { CharacterTypes } from './Character';

interface FiringEnemyTypes extends CharacterTypes {
  projectileType: string;
}

interface FiringEnemy extends Enemy, FiringEnemyTypes {}

class FiringEnemy extends Enemy implements FiringEnemy {
  constructor({ config, height, projectileType, width, x, y }: FiringEnemyTypes) {
    super({ config, height, width, x, y });
    this.config = config;
    this.height = height;
    this.projectileType = projectileType;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}

export type { FiringEnemyTypes };
export default FiringEnemy;
