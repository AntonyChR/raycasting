import { clearCanvas, createCanvas } from './canvas/canvas';
import { Boundary } from './raycast/Boundary';
import { Particle } from './raycast/Particle';

import './style.css';

const canvas = createCanvas();

const canvasCtx = canvas.getContext('2d')!;

let walls:Boundary[] = []

for( let i = 0; i < 5; i++){
    let x1 = Math.random() * 500
    let y1 = Math.random() * 500

    let x2 = Math.random() * 500
    let y2 = Math.random() * 500

    walls.push ( new Boundary(x1,y1,x2,y2,canvasCtx))
}
const wall = new Boundary(100, 100, 400, 400, canvasCtx);

const SECOND = 1_000;

const particle = new Particle(canvasCtx)


document.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    particle.update(event.clientX - rect.left, event.clientY - rect.top);
});


setInterval(() => {
    clearCanvas(canvasCtx);
    particle.look(walls[0])
    walls.forEach((w)=>{
        w.draw()
    })
    //wall.draw();
    particle.draw()
}, 0.1 * SECOND);
