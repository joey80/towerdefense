import GameObject, { GOTypes } from '../GameObject';
import Timer from './Timer';

interface Scene extends GameObject {
  frame: number;
  sceneEnd: boolean;
  timer: Timer | null;
}

class Scene extends GameObject implements Scene {
  constructor(config: GOTypes) {
    super(config);
    this.sceneEnd = false;
    this.timer = null;
  }

  update() {
    this.frame = this.frame + 1;
    if (this.sceneEnd) this.timer?.stop();
  }

  start() {
    this.timer = new Timer({ deltaTime: 1 / 60, update: () => this.update() });
    this.timer.start();
  }
}

export default Scene;
