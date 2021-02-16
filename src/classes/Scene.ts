import FiringDefender from './FiringDefender';
import FiringEnemy from './FiringEnemy';
import GameGridClass from './GameGrid';
import GameObject from './GameObject';
import { GameGrid, Text } from './Factory';
import Resource from './Resource';
import Timer from './Engine/Timer';
import { collision } from '../util';

interface Scene extends GameObject {
  cellGap: number;
  cellSize: number;
  config: GameObject;
  defenders: Array<FiringDefender>;
  enemies: Array<FiringEnemy>;
  enemiesInterval: number;
  enemyPositions: Array<number>;
  frame: number;
  gameGrid: GameGridClass | null;
  gameOver: boolean;
  numberOfResources: number;
  objectSize: number;
  resources: Array<Resource>;
  timer: Timer | null;
}

class Scene extends GameObject implements Scene {
  constructor(config: GameObject) {
    super(config);
    this.cellGap = 3;
    this.cellSize = 100;
    this.config = config;
    this.defenders = [];
    this.enemies = [];
    this.enemiesInterval = 700;
    this.enemyPositions = [];
    this.frame = 0;
    this.gameGrid = null;
    this.gameOver = false;
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
    this.resources = [];
    this.timer = null;
  }

  addListeners() {
    this.canvas.addEventListener('click', () => {
      const gridPosX = this.mouse.x - (this.mouse.x % this.cellSize);
      const gridPosY = this.mouse.y - (this.mouse.y % this.cellSize);
      const defenderCost = 100;
      if (gridPosY < this.cellSize) return;

      // TODO: clean this up
      // cant place defender on top of another
      for (let i = 0; i < this.defenders.length; i++) {
        if (this.defenders[i].x === gridPosX && this.defenders[i].y === gridPosY) return;
      }

      // TODO: clean this up
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

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, this.canvas.width, this.cellSize);
    this.gameGrid?.drawObjects();
    this.handleEnemies();
    this.handleDefenders();
    this.handleResources();
    this.handleGameStatus();
    this.frame = this.frame + 1;
    if (this.gameOver && this.timer) this.timer.stop();
  }

  handleDefenders() {
    this.defenders.map((defender, index) => {
      defender.draw();
      defender.update();

      this.enemies.map((enemy, enemyIndex) => {
        // if getting shot
        for (let i = 0; i <= defender.projectiles.length; i++) {
          if (collision(defender.projectiles[i], enemy)) {
            enemy.health -= defender.projectiles[i].power;
            defender.projectiles.splice(i, 1);

            // enemy killed
            if (enemy.health <= 0) {
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

      if (elm.x < 0) this.gameOver = true;
    });

    // add a new enemy to the gamegrid
    // TODO: clean this up
    // TODO: need a better way to handle gameloop timing
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
      // TODO: do we really need this bit?
      // if (this.enemiesInterval > 30000) this.enemiesInterval -= 50;
    }
  }

  handleGameStatus() {
    Text({
      config: this.config,
      size: 30,
      color: 'gold',
      text: `Resources: ${this.numberOfResources}`,
      vector: { x: 20, y: 55 },
    });

    if (this.gameOver) {
      Text({
        config: this.config,
        text: 'GAME OVER',
        size: 60,
        color: 'black',
        vector: { x: 135, y: 330 },
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
      if (this.resources[index] && collision(this.resources[index], this.mouse)) {
        this.numberOfResources += elm.amount;
        this.resources.splice(index, 1);
      }
    });
  }

  start() {
    this.gameGrid = GameGrid({
      config: this.config,
      cellSize: this.cellSize,
      objectSize: this.objectSize,
      cellGap: this.cellGap,
    });
    this.addListeners();
    this.timer = new Timer({ deltaTime: 1 / 60, update: () => this.animate() });
    this.timer.start();
  }
}

export default Scene;
