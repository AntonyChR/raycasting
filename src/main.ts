import { createCanvas } from './canvas/canvas';
import { Boundary } from './raycast/Boundary';
import { Particle } from './raycast/Particle';

import './style.css';

const CONFIG = {
    canvas: {
        width: window.innerWidth,
        height: window.innerHeight,
        bgColor: 'black',
    },
    scene2d: {
        width: window.innerWidth / 2,
        height: window.innerHeight,
    },
    nWalls: 5,
};
const canvas = createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);

const canvasCtx = canvas.getContext('2d')!;

let walls: Boundary[] = [];

for (let i = 0; i < CONFIG.nWalls; i++) {
    let x1 = Math.random() * CONFIG.scene2d.width;
    let y1 = Math.random() * CONFIG.scene2d.width;

    let x2 = Math.random() * CONFIG.scene2d.width;
    let y2 = Math.random() * CONFIG.scene2d.width;

    walls.push(new Boundary(x1, y1, x2, y2, canvasCtx));
}

walls.push(new Boundary(0, 0, CONFIG.scene2d.width, 0, canvasCtx)); //top
walls.push(new Boundary(0, 0, 0, CONFIG.scene2d.height, canvasCtx)); //left

walls.push(
    new Boundary(
        CONFIG.scene2d.width,
        CONFIG.scene2d.height,
        CONFIG.scene2d.width,
        0,
        canvasCtx
    )
);
walls.push(
    new Boundary(
        CONFIG.scene2d.width,
        CONFIG.scene2d.height,
        0,
        CONFIG.scene2d.height,
        canvasCtx
    )
);

const particle = new Particle(canvasCtx);

document.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    particle.update(event.clientX - rect.left, event.clientY - rect.top);
});

const SECOND = 1_000;

setInterval(() => {

    //reset canvas
    canvasCtx.fillStyle = 'black';
    canvasCtx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.width);

    particle.look(walls);
    walls.forEach((w) => {
        w.draw();
    });
}, 0.07 * SECOND);
