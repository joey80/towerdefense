import GameGridClass, { GameGridTypes } from './GameGrid';
import GameObject from './GameObject';
import MouseClass from './Mouse';
import SceneClass from './Engine/Scene';
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

const Text = ({
  color,
  config,
  height,
  size,
  text,
  width,
  x,
  y,
}: Omit<TextTypes, 'height' | 'width'> & { height?: number; width?: number }) => {
  const textobj = new TextClass({
    color,
    config,
    height: height || 0,
    size,
    text,
    width: width || 0,
    x,
    y,
  });
  textobj.draw();
  return textobj;
};

export { GameGrid, Mouse, Scene, Text };
