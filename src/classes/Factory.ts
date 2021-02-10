import GameGrid, { GameGridTypes } from './GameGrid';
import GameObject from './GameObject';
import Mouse from './Mouse';
import Scene from './Scene';
import Text, { TextTypes } from './Text';

const GameGridObj = ({ config, cellSize, objectSize, cellGap }: GameGridTypes) => {
  const gamegrid = new GameGrid({ config, cellSize, objectSize, cellGap });
  gamegrid.createGrid();
  return gamegrid;
};

const MouseObj = (canvas: HTMLCanvasElement) => {
  const mouse = new Mouse(canvas);
  mouse.start();
  return mouse;
};

const SceneObj = (config: GameObject) => {
  const scene = new Scene(config);
  scene.start();
  return scene;
};

const TextObj = ({ config, text, size, color, vector }: TextTypes) => {
  const textobj = new Text({ config, text, size, color, vector });
  textobj.draw();
  return textobj;
};

export { GameGridObj, MouseObj, SceneObj, TextObj };
