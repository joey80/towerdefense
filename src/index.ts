import GameObject from './classes/GameObject';
import Mouse from './classes/Mouse';
import Scene from './classes/Scene';

const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
canvas.width = 900;
canvas.height = 600;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const mouse = new Mouse(canvas);
mouse.start();
const game = new GameObject(canvas, ctx, mouse);
const scene = new Scene(game);

scene.start();
