import Mouse from './classes/Mouse';
import Scene from './classes/Scene';

// setup canvas on DOM
const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 900;
canvas.height = 600;

// start mouse tracking/event listeners
const mouse = new Mouse(canvas);
mouse.start();

// create global config and create scene
const config = { canvas, ctx, mouse };
const scene = new Scene(config);

// start the first level
scene.start();
