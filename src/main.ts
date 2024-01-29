import { clearCanvas, createCanvas } from './canvas/canvas';
import { NewCircle } from './forms/Circle';
import { Boundary } from './raycast/Boundary';
import { Ray } from './raycast/Ray';

import './style.css';

const canvas = createCanvas();

const canvasCtx = canvas.getContext('2d')!;

const wall = new Boundary(400, 100, 400, 400, canvasCtx);
const ray = new Ray(50, 250, canvasCtx);

const SECOND = 1_000;

document.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    ray.lookAt(mouseX, mouseY);
});
setInterval(() => {
    clearCanvas(canvasCtx);
    wall.draw();
    ray.draw();

    let pt = ray.cast(wall);
    if(pt){
        const c = NewCircle(pt,5,canvasCtx)
        c.draw()
    }
}, 0.05 * SECOND);
