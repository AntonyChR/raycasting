import Vector from '../vector/vector';
import Form from './Form';

export const newSquare = (
    start: Coordinates | Vector,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    lineWidth: number = 1,
    lineColor: string = '#000000',
    fillColor: string|null = null
) => {
    return new Square(
        new Vector(start.x, start.y),
        width,
        height,
        lineWidth,
        ctx,
        lineColor,
        fillColor
    );
};

class Square extends Form {
    public start: Vector;
    public width: number;
    public height: number;
    public ctx: CanvasRenderingContext2D;
    public lineWidth: number;
    public lineColor: string;
    public fillColor: string| null;
    constructor(
        start: Vector,
        width: number = 10,
        height: number = 10,
        lineWidth: number = 1,
        canvasCtx: CanvasRenderingContext2D,
        lineColor: string,
        fillColor: string |null
    ) {
        super();
        this.start = start;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.ctx = canvasCtx;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
    }

    draw(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.start.x, this.start.y, this.lineWidth, this.height);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineColor;
        if(this.fillColor){
            this.ctx.fillStyle = this.fillColor;
        }
        this.ctx.stroke();
        this.ctx.fill()
    }
}
