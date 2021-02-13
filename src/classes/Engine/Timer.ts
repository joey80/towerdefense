interface Timer {
  accumulatedTime: number;
  deltaTime: number;
  isRunning: boolean;
  lastTime: number | null;
  update: () => void;
}

class Timer implements Timer {
  constructor({ deltaTime, update }: Pick<Timer, 'deltaTime' | 'update'>) {
    this.accumulatedTime = 0;
    this.deltaTime = deltaTime;
    this.isRunning = true;
    this.lastTime = null;
    this.update = update;
  }

  start() {
    this.isRunning = true;
    requestAnimationFrame(time => this.updateProxy(time));
  }

  stop() {
    this.isRunning = false;
  }

  updateProxy(time: number) {
    if (this.lastTime) {
      this.accumulatedTime += (time - this.lastTime) / 1000;

      if (this.accumulatedTime > 1) {
        this.accumulatedTime = 1;
      }

      while (this.accumulatedTime > this.deltaTime) {
        this.update();
        this.accumulatedTime -= this.deltaTime;
      }
    }

    this.lastTime = time;
    if (this.isRunning) this.start();
  }
}

export default Timer;
