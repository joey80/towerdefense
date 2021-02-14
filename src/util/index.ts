import { GameObjectType } from '../classes/GameObject';

// detects collision between two GameObjects
const collision = (first: GameObjectType, second: GameObjectType) => {
  if (!first || !second) return null;

  const cellGap2 = 3 * 2;
  const { x, y, width, height } = first;
  const { x: x2, y: y2, width: width2, height: height2 } = second;
  return !(
    x > x2 + width2 + cellGap2 ||
    x + width + cellGap2 < x2 ||
    y > y2 + height2 ||
    y + height < y2
  );
};

const collisionArray = (firstArr: Array<any>, secondArr: Array<any>) => {
  for (let i = 0; i <= firstArr.length; i++) {
    for (let j = 0; j <= secondArr.length; j++) {
      if (collision(firstArr[i], secondArr[j])) {
        return true;
      }
    }
  }
  return false;
};

export { collision, collisionArray };
