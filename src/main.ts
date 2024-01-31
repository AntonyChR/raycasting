import { createCanvas } from './canvas/canvas';
import { newSquare } from './forms/Square';
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
        wallsColor: 'red',
    },
    nWalls: 5,
};

const canvas = createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);

const canvasCtx = canvas.getContext('2d')!;

let walls: Boundary[] = [];

function generateRandomWall(): Boundary {
    let x1 = Math.random() * CONFIG.scene2d.width;
    let y1 = Math.random() * CONFIG.scene2d.height;

    let x2 = Math.random() * CONFIG.scene2d.width;
    let y2 = Math.random() * CONFIG.scene2d.height;

    return new Boundary(x1, y1, x2, y2, canvasCtx, CONFIG.scene2d.wallsColor);
}

// create random walls
for (let i = 0; i < CONFIG.nWalls; i++) {
    walls.push(generateRandomWall());
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

// add random wall
document.querySelector('.add-wall')!.addEventListener('click', () => {
    walls.push(generateRandomWall());
});

// main loop
const SECOND = 1_000;
setInterval(() => {
    //reset canvas
    canvasCtx.fillStyle = CONFIG.canvas.bgColor;
    canvasCtx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);

    // scene contains distance to visible walls in the field of view

    const scene: number[] = particle.look(walls);

    const w = CONFIG.canvas.width / 2 / scene.length;

    newSquare(
        { x: CONFIG.canvas.width / 2, y: 0 },
        CONFIG.canvas.width / 2,
        CONFIG.canvas.height,
        canvasCtx,
        'white'
    ).draw();
    for (let i = 0; i < scene.length; i++) {

        // the distance to the wall is between 0 and 255, we need values between 0 and 1 for alpha
        const color = `rgba(0,0,0,${scene[i]/200})`; // normalization dividing by 255
        newSquare(
            { x: CONFIG.canvas.width / 2 + i * w, y: 0 },
            w,
            CONFIG.canvas.height,
            canvasCtx,
            color,
        ).draw();
    }

    walls.forEach((w) => {
        w.draw();
    });
}, 0.07 * SECOND);
