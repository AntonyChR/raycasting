import { Line, NewCircle, NewLine } from './forms';
import './style.css';
import Vector from './vector';

const CANVAS_CONFIG = {
    WIDTH: 720,
    HEIGHT: 700,
};

const SECOND = 1_000;

const $canvas = document.createElement('canvas');
$canvas.width = CANVAS_CONFIG.WIDTH;
$canvas.height = CANVAS_CONFIG.HEIGHT;

document.querySelector<HTMLDivElement>('#app')!.appendChild($canvas);
const $counter = document.querySelector('#count')!;

const canvasCtx = $canvas.getContext('2d')!;

const clearCanvas = () => {
    canvasCtx.clearRect(0, 0, CANVAS_CONFIG.WIDTH, CANVAS_CONFIG.HEIGHT);
};

const ball = NewCircle({ x: 100, y: 80 }, 20, canvasCtx);
let velocity = new Vector(
    Math.floor(Math.random() * 10 + 5),
    Math.floor(Math.random() * 10 + 5)
);
const lines: Line[] = [];

// circle container
const CONTAINER_RADIUS = 250;
const CONTAINER_CENTER = new Vector(250, 250);

const CIRCLE_CONTAINER = NewCircle(
    CONTAINER_CENTER,
    CONTAINER_RADIUS,
    canvasCtx
);

const interval = setInterval(() => {
    clearCanvas();

    if (ball.position.norm(CONTAINER_CENTER) >= CONTAINER_RADIUS) {
        //lines.push(NewLine(ball.position, ball.position, canvasCtx));

        //calculate velocity components
        let center_to_ball = ball.position.minus(CONTAINER_CENTER);
        let normal = new Vector(-center_to_ball.y,center_to_ball.x);
        $counter.innerHTML = `${normal.dot(center_to_ball)}`;

        let tangencial = velocity.projectedOnto(normal);
        let radial = velocity.projectedOnto(center_to_ball).scalarProduct(-1);

        velocity = tangencial.add(radial);

        const normal_line = NewLine(ball.position,ball.position.add(normal),canvasCtx,1,'#0000ff')
        const radial_line = NewLine(
            CONTAINER_CENTER,
            ball.position,
            canvasCtx,
            1,
            '#ff0000'
        );
        radial_line.draw();
        normal_line.draw();
        
        clearInterval(interval);

        //tangencial component
    }

    //$counter.innerHTML = `${lines.length}`;
    ball.position = ball.position.add(velocity);

    if (lines) {
        lines.forEach((line) => {
            line.end = ball.position;
        });
    }

    CIRCLE_CONTAINER.draw();
    ball.draw();

    if (lines) {
        lines.forEach((line) => {
            line.draw();
        });
    }
}, 0.03 * SECOND);

// square container
// setInterval(() => {
//     clearCanvas();

//     if (ball.position.x >= CANVAS_CONFIG.WIDTH || ball.position.x <= 0) {
//         lines.push(NewLine(ball.position, ball.position, canvasCtx));
//         velocity.x *= -1;
//     }

//     if (ball.position.y >= CANVAS_CONFIG.HEIGHT || ball.position.y <= 0) {
//         lines.push(NewLine(ball.position, ball.position, canvasCtx));
//         velocity.y *= -1;
//     }

//     $counter.innerHTML = `${lines.length}`;
//     ball.position = ball.position.add(velocity);

//     if (lines) {
//         lines.forEach((line) => {
//             line.end = ball.position;
//         });
//     }

//     ball.draw();

//     if (lines) {
//         lines.forEach((line) => {
//             line.draw();
//         });
//     }
// }, 0.03 * SECOND);
