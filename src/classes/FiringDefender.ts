import Defender from './Defender';
import { CharacterTypes } from './Character';

interface FiringDefenderTypes extends CharacterTypes {
  projectileType: string;
  timer: number;
}

interface FiringDefender extends Defender, FiringDefenderTypes {}

class FiringDefender extends Defender implements FiringDefender {
  constructor({ config, height, projectileType, width, x, y }: Omit<FiringDefenderTypes, 'timer'>) {
    super({ config, height, width, x, y });
    this.config = config;
    this.height = height;
    this.projectileType = projectileType;
    this.timer = 0;
    this.width = width;
    this.x = x;
    this.y = y;
  }
}

export type { FiringDefenderTypes };
export default FiringDefender;
