import GameGridClass from '../GameGrid';
import { GOTypes } from '../GameObject';
import Resource from '../Resource';
import Scene from '../Engine/Scene';
import TextClass from '../Text';
import { GameGrid, Text } from '../Factory';
import { collision, collision2 } from '../../util';

interface Level extends Scene {
  cellGap: number;
  cellSize: number;
  gameGrid: GameGridClass | null;
  labels: Array<TextClass>;
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
    this.labels = [];
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
    this.resources = [];
  }

  addLabels() {
    this.labels.push(
      new TextClass({
        color: 'white',
        config: this.config,
        height: 25,
        size: 20,
        text: 'Red Defender',
        width: 130,
        x: 500,
        y: 55,
      }),
      new TextClass({
        color: 'white',
        config: this.config,
        height: 25,
        size: 20,
        text: 'Regular Defender',
        width: 160,
        x: 700,
        y: 55,
      })
    );
  }

  drawMenu() {
    // blue menu
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.cellSize);

    // defender types
    this.labels.map((elm) => {
      elm.draw();
    });
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

  handleLabels() {
    this.labels.map((elm) => {
      if (collision2(elm, { ...this.config.mouse.clickedPosition, height: 5, width: 5 })) {
        // TODO: should this reset after clicking?
        console.log(`you hit`, elm);
      }
    });
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
    this.addLabels();
  }

  update() {
    this.drawMenu();
    this.gameGrid?.drawObjects();
    this.handleLabels();
    this.handleResources();
    this.handleGameStatus();
    super.update();
  }
}

export default Level;
