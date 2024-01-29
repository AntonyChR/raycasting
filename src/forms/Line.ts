import Vector from "../vector/vector";
import Form from "./Form";

export function NewLine(
    start: Coordinates | Vector,
    end: Coordinates | Vector,
    canvasCtx: CanvasRenderingContext2D,
    lineWidth: number = 1,
    color: string = '#000000'
): Line {
    return new Line(
        new Vector(start.x, start.y),
        new Vector(end.x, end.y),
        canvasCtx!,
        lineWidth,
        color
    );
}

export class Line extends Form {
    public start: Vector;
    public end: Vector;
    public lineWidth: number;
    public ctx: CanvasRenderingContext2D;
    public lineColor: string;
    constructor(
        start: Vector,
        end: Vector,
        canvasCtx: CanvasRenderingContext2D,
        width: number = 5,
        color: string
    ) {
        super();
        this.start = start;
        this.end = end;
        this.lineWidth = width;
        this.ctx = canvasCtx;
        this.lineColor = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.stroke();
    }
}