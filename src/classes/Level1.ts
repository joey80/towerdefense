import FiringDefender from './FiringDefender';
import FiringEnemy from './FiringEnemy';
import GameGridClass from './GameGrid';
import { GOTypes } from './GameObject';
import Resource from './Resource';
import Scene from './Engine/Scene';
import { GameGrid, Text } from './Factory';
import { collision } from '../util';

interface Level1 extends Scene {
  cellGap: number;
  cellSize: number;
  defenders: Array<FiringDefender>;
  enemies: Array<FiringEnemy>;
  enemiesInterval: number;
  enemyPositions: Array<number>;
  gameGrid: GameGridClass | null;
  numberOfResources: number;
  objectSize: number;
  resources: Array<Resource>;
}

// TODO: should game objects have an id?
class Level1 extends Scene implements Level1 {
  constructor({ canvas, ctx, mouse }: GOTypes) {
    super({ canvas, ctx, mouse });
    this.cellGap = 3;
    this.cellSize = 100;
    this.config = { canvas, ctx, mouse };
    this.defenders = [];
    this.enemies = [];
    this.enemiesInterval = 600;
    this.enemyPositions = [];
    this.frame = 0;
    this.gameGrid = null;
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
    this.resources = [];
  }

  addListeners() {
    this.canvas.addEventListener('click', () => {
      const gridPosX = this.mouse.x - (this.mouse.x % this.cellSize);
      const gridPosY = this.mouse.y - (this.mouse.y % this.cellSize);
      const defenderCost = 100;
      if (gridPosY < this.cellSize) return;

      // cant place defender on top of another
      for (let i = 0; i < this.defenders.length; i++) {
        if (this.defenders[i].x === gridPosX && this.defenders[i].y === gridPosY) return;
      }

      // adding a new defender
      if (this.numberOfResources >= defenderCost) {
        this.defenders.push(
          new FiringDefender({
            config: this.config,
            height: this.objectSize,
            projectileType: 'black',
            width: this.objectSize,
            x: gridPosX,
            y: gridPosY,
          })
        );
        this.numberOfResources -= defenderCost;
      }
    });
  }

  drawMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.cellSize);
  }

  handleDefenders() {
    this.defenders.map((defender, index) => {
      defender.draw();
      defender.update();

      if (this.enemyPositions.indexOf(defender.y) !== -1) {
        defender.shooting = true;
      } else {
        defender.shooting = false;
      }

      this.enemies.map((enemy, enemyIndex) => {
        // if getting shot
        for (let i = 0; i <= defender.projectiles.length; i++) {
          if (collision(defender.projectiles[i], enemy)) {
            enemy.health -= defender.projectiles[i].power;
            defender.projectiles.splice(i, 1);

            // enemy killed
            if (enemy.health <= 0) {
              // remove from the positions array
              this.enemyPositions.splice(this.enemyPositions.indexOf(enemy.y), 1);

              // remove from the enemy array
              this.enemies.splice(enemyIndex, 1);
            }
          }
        }

        // if fighting
        if (collision(defender, enemy)) {
          enemy.movement = 0;
          defender.health -= 0.2;
        }

        // defender killed
        if (defender.health <= 0) {
          this.defenders.splice(index, 1);
          enemy.movement = enemy.speed;
        }
      });
    });

    // draw projectiles last so they get painted on top
    this.defenders.map((defender) => {
      defender.drawProjectile();
    });
  }

  handleEnemies() {
    this.enemies.map((elm) => {
      elm.update();
      elm.draw();

      // reached the left edge
      if (elm.x < 0) this.sceneEnd = true;
    });

    // add a new enemy to the gamegrid
    if (this.frame % this.enemiesInterval === 0) {
      const verticalPosition = Math.floor(Math.random() * 5 + 1) * this.cellSize;
      this.enemies.push(
        new FiringEnemy({
          config: this.config,
          height: this.objectSize,
          projectileType: 'black',
          width: this.objectSize,
          x: this.canvas.width,
          y: verticalPosition,
        })
      );
      this.enemyPositions.push(verticalPosition);
      // speed up the flow of new enemies
      // TODO: limit this to max enemy amount per row at one time
      if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
    }
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
    this.addListeners();
  }

  update() {
    this.drawMenu();
    this.gameGrid?.drawObjects();
    this.handleEnemies();
    this.handleDefenders();
    this.handleResources();
    this.handleGameStatus();
    super.update();
  }
}

export default Level1;
