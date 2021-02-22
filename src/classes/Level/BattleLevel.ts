// import FiringDefender from '../FiringDefender';
import FiringEnemy from '../FiringEnemy';
import { GOTypes } from '../GameObject';
import Level from './Level';
import RedDefender from '../Defender/RedDefender';
import { collision } from '../../util';

interface BattleLevel extends Level {
  defenders: Array<RedDefender>;
  enemies: Array<FiringEnemy>;
  enemiesInterval: number;
  enemyPositions: Array<number>;
}

// TODO: should game objects have an id?
class BattleLevel extends Level implements BattleLevel {
  constructor({ canvas, ctx, mouse }: GOTypes) {
    super({ canvas, ctx, mouse });
    this.config = { canvas, ctx, mouse };
    this.defenders = [];
    this.enemies = [];
    this.enemiesInterval = 600;
    this.enemyPositions = [];
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
          new RedDefender({
            config: this.config,
            height: this.objectSize,
            width: this.objectSize,
            x: gridPosX,
            y: gridPosY,
          })
        );
        this.numberOfResources -= defenderCost;
      }
    });
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
              this.numberOfResources += 20;
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

  start() {
    super.start();
    this.addListeners();
  }

  update() {
    super.update();
    this.handleEnemies();
    this.handleDefenders();
  }
}

export default BattleLevel;
