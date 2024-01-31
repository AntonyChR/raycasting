import Vector from '../vector/vector';
import Form from './Form';

export const newSquare = (
    start: Coordinates | Vector,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    fillColor: string = 'black',
) => {
    return new SolidSquare(
        new Vector(start.x, start.y),
        width,
        height,
        ctx,
        fillColor,
    );
};


class SolidSquare {
    public start: Vector; // Vector contiene coordenadas y se accede: Vector.x Vector.y
    public width: number;
    public height: number;
    public ctx: CanvasRenderingContext2D;
    public fillColor: string;
    constructor(
        start: Vector,
        width: number = 10,
        height: number = 10,
        canvasCtx: CanvasRenderingContext2D,
        fillColor: string  = 'black',
    ) {
        this.start = start;
        this.width = width;
        this.height = height;
        this.ctx = canvasCtx;
        this.fillColor = fillColor;
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.start.x, this.start.y, this.width, this.height);
        this.ctx.closePath();
    }
}


