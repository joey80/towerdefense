import Defender from './Defender';
import Enemy from './Enemy';
import GameGrid from './GameGrid';
import GameObject from './GameObject';
import { collision } from '../util';

// TODO: name this something else
// export type GameObject = Cell | Defender | Enemy | Mouse;

interface Scene extends GameObject {
  cellGap: number;
  cellSize: number;
  defenders: Array<Defender>;
  enemies: Array<Enemy>;
  enemiesInterval: number;
  enemyPositions: Array<number>;
  frame: number;
  gameGrid: GameGrid | null;
  gameObject: GameObject;
  gameOver: boolean;
  numberOfResources: number;
  objectSize: number;
}

class Scene implements Scene {
  constructor(gameObject: GameObject) {
    this.cellGap = 3;
    this.cellSize = 100;
    this.defenders = [];
    this.enemies = [];
    this.enemiesInterval = 600;
    this.enemyPositions = [];
    this.frame = 0;
    this.gameGrid = null;
    this.gameObject = gameObject;
    this.gameOver = false;
    this.numberOfResources = 300;
    this.objectSize = 100 - 3 * 2;
  }

  addListeners() {
    const { canvas, mouse } = this.gameObject;
    canvas.addEventListener('click', () => {
      const gridPosX = mouse.x - (mouse.x % this.cellSize) + this.cellGap;
      const gridPosY = mouse.y - (mouse.y % this.cellSize) + this.cellGap;
      const defenderCost = 100;
      if (gridPosY < this.cellSize) return;

      // TODO: clean this up
      // cant place defender on top of another
      for (let i = 0; i < this.defenders.length; i++) {
        if (this.defenders[i].x === gridPosX && this.defenders[i].y === gridPosY) return;
      }

      // TODO: clean this up
      if (this.numberOfResources >= defenderCost) {
        this.defenders.push(new Defender(this.gameObject, gridPosX, gridPosY, this.objectSize));
        this.numberOfResources -= defenderCost;
      }
    });
  }

  animate() {
    this.gameObject.ctx.clearRect(
      0,
      0,
      this.gameObject.canvas.width,
      this.gameObject.canvas.height
    );
    this.gameObject.ctx.fillStyle = 'blue';
    this.gameObject.ctx.fillRect(0, 0, this.gameObject.canvas.width, this.cellSize);
    this.gameGrid?.drawObjects();
    this.handleDefenders();
    this.handleEnemies();
    this.handleGameStatus();
    this.frame = this.frame + 1;
    if (!this.gameOver) requestAnimationFrame(() => this.animate());
  }

  handleDefenders() {
    this.defenders.map((defender) => {
      defender.draw();

      this.enemies.map((enemy) => {
        if (collision(defender, enemy)) {
          enemy.movement = 0;
          defender.health -= 0.2;
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

    if (this.frame % this.enemiesInterval === 0) {
      const verticalPosition = Math.floor(Math.random() * 5 + 1) * this.cellSize + this.cellGap;
      this.enemies.push(new Enemy(this.gameObject, verticalPosition, this.objectSize));
      this.enemyPositions.push(verticalPosition);
      if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
    }
  }

  handleGameStatus() {
    this.gameObject.ctx.fillStyle = 'gold';
    this.gameObject.ctx.font = '30px Arial';
    this.gameObject.ctx.fillText(`Resources: ${this.numberOfResources}`, 20, 55);

    if (this.gameOver) {
      this.gameObject.ctx.fillStyle = 'black';
      this.gameObject.ctx.font = '60px Arial';
      this.gameObject.ctx.fillText('GAME OVER', 135, 330);
    }
  }

  start() {
    this.gameGrid = new GameGrid(this.gameObject, this.cellSize, this.objectSize);
    this.gameGrid.createGrid();
    this.addListeners();
    this.animate();
  }
}

export default Scene;
