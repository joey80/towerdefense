import GameGridClass, { GameGridTypes } from './GameGrid';
import GameObject from './GameObject';
import MouseClass from './Mouse';
import SceneClass from './Scene';
import TextClass, { TextTypes } from './Text';

const GameGrid = ({ config, cellSize, objectSize, cellGap }: GameGridTypes) => {
  const gamegrid = new GameGridClass({ config, cellSize, objectSize, cellGap });
  gamegrid.createGrid();
  return gamegrid;
};

const Mouse = (canvas: HTMLCanvasElement) => {
  const mouse = new MouseClass(canvas);
  mouse.start();
  return mouse;
};

const Scene = (config: GameObject) => {
  const scene = new SceneClass(config);
  scene.start();
  return scene;
};

const Text = ({ config, text, size, color, x, y }: TextTypes) => {
  const textobj = new TextClass({ config, text, size, color, x, y });
  textobj.draw();
  return textobj;
};

export { GameGrid, Mouse, Scene, Text };
