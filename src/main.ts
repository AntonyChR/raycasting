import { Line, NewCircle, NewLine } from './forms';
import './style.css';
import Vector from './vector';

const CANVAS_CONFIG = {
    WIDTH: 520,
    HEIGHT: 500,
};

const SECOND = 1_000;

const $canvas = document.createElement('canvas');
$canvas.width = CANVAS_CONFIG.WIDTH;
$canvas.height = CANVAS_CONFIG.HEIGHT;

document.querySelector<HTMLDivElement>('#app')!.appendChild($canvas);
const $counter = document.querySelector('#count')!

const canvasCtx = $canvas.getContext('2d')!;

const clearCanvas = () => {
    canvasCtx.clearRect(0, 0, CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
};

const c1 = NewCircle({ x: 250, y: 250 }, 20, canvasCtx);
const velocity = new Vector(Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1));
const lines: Line[] = [];
setInterval(() => {
    clearCanvas();

    if (c1.position.x >= CANVAS_CONFIG.WIDTH || c1.position.x <= 0) {
        lines.push(NewLine(c1.position, c1.position, canvasCtx));
        velocity.x *= -1;
    }
    
    if (c1.position.y >= CANVAS_CONFIG.HEIGHT || c1.position.y <= 0) {
        lines.push(NewLine(c1.position, c1.position, canvasCtx));
        velocity.y *= -1;
    }

    $counter.innerHTML = `${lines.length}`
    c1.position = c1.position.add(velocity);

    if (lines) {
        lines.forEach((line) => {
            line.end = c1.position;
        });
    }

    c1.draw();

    if (lines) {
        lines.forEach((line) => {
            line.draw()
        });
    }


}, 0.03 * SECOND);
