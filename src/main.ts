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
        wallsColor: 'red'
    },
    nWalls: 5,
};

const canvas = createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);

const canvasCtx = canvas.getContext('2d')!;



let walls: Boundary[] = [];

// create random walls
for (let i = 0; i < CONFIG.nWalls; i++) {
    let x1 = Math.random() * CONFIG.scene2d.width;
    let y1 = Math.random() * CONFIG.scene2d.height;

    let x2 = Math.random() * CONFIG.scene2d.width;
    let y2 = Math.random() * CONFIG.scene2d.height;

    walls.push(new Boundary(x1, y1, x2, y2, canvasCtx, CONFIG.scene2d.wallsColor));
}

// create 2d scene boundaries

walls.push(new Boundary(0, 0, CONFIG.scene2d.width, 0, canvasCtx)); //top
walls.push(new Boundary(0, 0, 0, CONFIG.scene2d.height, canvasCtx)); //left

//right
walls.push(
    new Boundary(
        CONFIG.scene2d.width,
        CONFIG.scene2d.height,
        CONFIG.scene2d.width,
        0,
        canvasCtx
    )
);

//bottom
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

// update particle position
document.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    particle.update(event.clientX - rect.left, event.clientY - rect.top);
});

// main loop
const SECOND = 1_000;
setInterval(() => {

    //reset canvas
    canvasCtx.fillStyle = CONFIG.canvas.bgColor;
    canvasCtx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);

    particle.look(walls);
    
    walls.forEach((w) => {
        w.draw();
    });
}, 0.07 * SECOND);
