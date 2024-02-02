import { Boundary } from './Boundary';

export class Box {
    public walls: Boundary[];
    public canvasCtx: CanvasRenderingContext2D;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        canvasCtx: CanvasRenderingContext2D
    ) {
        this.x = x
        this.y = y
        this.h = h
        this.w = w
        this.walls = [];
        this.canvasCtx = canvasCtx;

        this.walls.push(new Boundary(x, y, x + w, y, canvasCtx));
        this.walls.push(new Boundary(x, y, x, y + h, canvasCtx));

        this.walls.push(new Boundary(x + w, y + h, x, y + h, canvasCtx));
        this.walls.push(new Boundary(x + w, y + h, x + w, y, canvasCtx));
    }

    getWalls(): Boundary[] {
        return this.walls;
    }
    draw() {
        this.walls.forEach((w) => w.draw());
        this.canvasCtx.fillStyle = 'red';
        this.canvasCtx.fillRect(this.x,this.y,this.w,this.h);
    }
}
