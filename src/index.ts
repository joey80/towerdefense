import Level1 from './classes/Level1';
import { Mouse } from './classes/Factory';

// setup canvas on DOM
const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 900;
canvas.height = 600;

// start mouse tracking/event listeners
const mouse = Mouse(canvas);

// create first scene and start
const level1 = new Level1({ canvas, ctx, mouse });
level1.start();
