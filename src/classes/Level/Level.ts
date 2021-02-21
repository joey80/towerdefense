import GameGridClass from '../GameGrid';
import { GOTypes } from '../GameObject';
import Resource from '../Resource';
import Scene from '../Engine/Scene';
import { GameGrid, Text } from '../Factory';
import { collision } from '../../util';

interface Level extends Scene {
  cellGap: number;
  cellSize: number;
  gameGrid: GameGridClass | null;
  numberOfResources: number;
  objectSize: number;
  resources: Array<Resource>;
}

// TODO: should game objects have an id?
class Level extends Scene implements Level {
  constructor({ canvas, ctx, mouse }: GOTypes) {
    super({ canvas, ctx, mouse });
    this.cellGap = 3;
    this.cellSize = 100;
    this.config = { canvas, ctx, mouse };
    this.gameGrid = null;
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
    this.resources = [];
  }

  drawMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.cellSize);
  }

  handleGameStatus() {
    Text({
      config: this.config,
      text: `Resources: ${this.numberOfResources}`,
      x: 150,
      y: 55,
    });

    if (this.sceneEnd) {
      Text({
        config: this.config,
        text: 'GAME OVER',
        size: 60,
        color: 'black',
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
      });
    }
  }

  handleResources() {
    if (this.frame % 500 === 0) {
      this.resources.push(
        new Resource({ config: this.config, amounts: [20, 30, 40], cellSize: this.cellSize })
      );
    }

    this.resources.map((elm, index) => {
      elm.draw();
      // collect a new resource
      if (this.resources[index] && collision(this.resources[index], this.mouse)) {
        this.numberOfResources += elm.amount;
        this.resources.splice(index, 1);
      }
    });
  }

  start() {
    super.start();
    this.gameGrid = GameGrid({
      config: this.config,
      cellSize: this.cellSize,
      objectSize: this.objectSize,
      cellGap: this.cellGap,
    });
  }

  update() {
    this.drawMenu();
    this.gameGrid?.drawObjects();
    this.handleResources();
    this.handleGameStatus();
    super.update();
  }
}

export default Level;
