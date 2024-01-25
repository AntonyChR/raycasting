import './style.css';

import { createCanvas } from './canvas';
import { Line, NewLine } from './forms/Line';
import { newSquare } from './forms/Square';

const canvas = createCanvas();
const canvasCtx = canvas.getContext('2d');

type Matrix = number[][]

const makeMatrix = (rows: number, cols: number) => {
    let matrix: Matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        matrix.push(row);
    }
    return matrix;
};

const createGrid = (
    matrix: Matrix,
    width: number = 10,
    height: number = 10
) => {
    const hLines = matrix.length + 1;
    const vLines = matrix[0].length + 1;

    const grid: Line[] = [];

    for (let i = 0; i < hLines; i++) {
        const start = {
            x: 0,
            y: i * width,
        };

        const end = {
            x: (vLines - 1) * height,
            y: i * width,
        };
        grid.push(NewLine(start, end, canvasCtx!));
    }

    for (let i = 0; i < vLines; i++) {
        const start = {
            x: i * height,
            y: 0,
        };
        const end = {
            x: i * height,
            y: width * (hLines - 1),
        };
        grid.push(NewLine(start, end, canvasCtx!));
    }

    return {
        lines: grid,
        draw: () => {
            grid.forEach((l) => l.draw());
        },
    };
};


const m = makeMatrix(5, 5);

const grid = createGrid(m, 20, 20);
console.log(m)
grid.draw();


canvas.addEventListener('click',(event:MouseEvent)=>{
    const rect = canvas.getBoundingClientRect()
    const top = rect.top + window.scrollY
    const left = rect.left + window.scrollX

    const i = Math.floor((event.clientY - top) / 20)
    const j = Math.floor((event.clientX - left) / 20)

    m[i][j] = 1;
    console.log(m)

})



