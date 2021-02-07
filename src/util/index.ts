import GameObject from '../classes/GameObject';

// TODO: fix this import/typing
const collision = (first: GameObject, second: GameObject) => {
  const { x, y, width, height } = first;
  const { x: x2, y: y2, width: width2, height: height2 } = second;
  return !(x > x2 + width2 || x + width < x2 || y > y2 + height2 || y + height < y2);
};

export { collision };
