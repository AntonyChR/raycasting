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
        lineWidth,
        canvasCtx!,
        color
    );
}

export class Line extends Form {
    public start: Vector;
    public end: Vector;
    public width: number;
    public ctx: CanvasRenderingContext2D;
    public lineColor: string;
    constructor(
        start: Vector,
        end: Vector,
        width: number = 5,
        canvasCtx: CanvasRenderingContext2D,
        color: string
    ) {
        super();
        this.start = start;
        this.end = end;
        this.width = width;
        this.ctx = canvasCtx;
        this.lineColor = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.lineWidth = this.width;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.stroke();
    }
}