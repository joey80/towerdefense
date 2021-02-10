import { MouseObj, SceneObj } from './classes/Factory';

// setup canvas on DOM
const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 900;
canvas.height = 600;

// start mouse tracking/event listeners
const mouse = MouseObj(canvas);

// create global config and create scene
const config = { canvas, ctx, mouse };
SceneObj(config);
