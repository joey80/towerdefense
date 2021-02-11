import FiringDefender from './FiringDefender';
import FiringEnemy from './FiringEnemy';
import GameGridClass from './GameGrid';
import GameObject from './GameObject';
import Projectiles from './Projectiles';
import { GameGrid, Text } from './Factory';
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
  projectiles: Array<Projectiles>;
}

class Scene extends GameObject implements Scene {
  constructor(config: GameObject) {
    super(config);
    this.cellGap = 3;
    this.cellSize = 100;
    this.config = config;
    this.defenders = [];
    this.enemies = [];
    this.enemiesInterval = 2400;
    this.enemyPositions = [];
    this.frame = 0;
    this.gameGrid = null;
    this.gameOver = false;
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
    this.projectiles = [];
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
    this.handleDefenders();
    this.handleEnemies();
    this.handleGameStatus();
    this.frame = this.frame + 1;
    if (!this.gameOver) requestAnimationFrame(() => this.animate());
  }

  handleDefenders() {
    this.defenders.map((defender, index) => {
      defender.draw();

      this.enemies.map((enemy) => {
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
  }

  handleEnemies() {
    this.enemies.map((elm) => {
      elm.update();
      elm.draw();

      if (elm.x < 0) this.gameOver = true;
    });

    // add a new enemy to the gamegrid
    // TODO: clean this up
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

  handleProjectiles() {
    this.projectiles.map((elm, index) => {
      elm.update();
      elm.draw();

      if (elm && elm.x > this.canvas.width - this.cellSize) {
        this.projectiles.splice(index, 1);
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
    this.animate();
  }
}

export default Scene;
