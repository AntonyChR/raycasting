import { normalize } from './Math/lib';
import { createCanvas } from './canvas/canvas';
import { newSquare } from './forms/Square';
import { Boundary } from './raycast/Boundary';
import { Particle } from './raycast/Particle';

import './style.css';

const CONFIG = {
    canvas: {
        width: window.innerWidth / 2,
        height: window.innerHeight,
        bgColor: 'black',
    },
    scene2d: {
        wallsColor: 'red',
    },
    nWalls: 5,
};

const canvas2d = createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);
const canvas3d = createCanvas(CONFIG.canvas.width, CONFIG.canvas.height);

const canvas2dCtx = canvas2d.getContext('2d')!;
const canvas3dCtx = canvas3d.getContext('2d')!;

let walls: Boundary[] = [];

function generateRandomWall(): Boundary {
    let x1 = Math.random() * CONFIG.canvas.width;
    let y1 = Math.random() * CONFIG.canvas.height;

    let x2 = Math.random() * CONFIG.canvas.width;
    let y2 = Math.random() * CONFIG.canvas.height;

    return new Boundary(x1, y1, x2, y2, canvas2dCtx, CONFIG.scene2d.wallsColor);
}

// create random walls
for (let i = 0; i < CONFIG.nWalls; i++) {
    walls.push(generateRandomWall());
}

// create 2d scene boundaries

walls.push(new Boundary(0, 0, CONFIG.canvas.width, 0, canvas2dCtx)); //top
walls.push(new Boundary(0, 0, 0, CONFIG.canvas.height, canvas2dCtx)); //left

//right
walls.push(
    new Boundary(
        CONFIG.canvas.width,
        CONFIG.canvas.height,
        CONFIG.canvas.width,
        0,
        canvas2dCtx
    )
);

//bottom
walls.push(
    new Boundary(
        CONFIG.canvas.width,
        CONFIG.canvas.height,
        0,
        CONFIG.canvas.height,
        canvas2dCtx
    )
);

const particle = new Particle(canvas2dCtx);

// update particle position
document.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas2d.getBoundingClientRect();
    particle.update(event.clientX - rect.left, event.clientY - rect.top);
});

// add random wall
document.querySelector('.add-wall')!.addEventListener('click', () => {
    walls.push(generateRandomWall());
});

// main loop
const SECOND = 1_000;

const diagonal = Math.sqrt(CONFIG.canvas.width**2+CONFIG.canvas.height**2 )
setInterval(() => {
    //reset canvas
    canvas2dCtx.fillStyle = CONFIG.canvas.bgColor;
    canvas2dCtx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height);

    // scene contains distance to visible walls in the field of view

    const scene: number[] = particle.look(walls);
    const w = CONFIG.canvas.width / scene.length;

    newSquare(
        { x: 0, y: 0 },
        CONFIG.canvas.width,
        CONFIG.canvas.height,
        canvas3dCtx,
        'white'
    ).draw();

    for (let i = 0; i < scene.length; i++) {

        //change the third parameter to adjust the grayscale

        const grey = 255 - normalize(scene[i], 0, diagonal/2, 0, 255);

        canvas3dCtx.fillStyle = `rgb(${grey} ${grey} ${grey})`;
        canvas3dCtx.fillRect(i * w - 1, 0, w + 1, CONFIG.canvas.height);

    }

    walls.forEach((w) => {
        w.draw();
    });
}, 0.07 * SECOND);
