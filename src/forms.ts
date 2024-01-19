import Form from './Form';
import Vector from './vector';

interface Coordinates {
    x: number;
    y: number;
}

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
    public color: string;
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
        this.color = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.lineWidth = this.width;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}

export function NewCircle(
    position: Coordinates | Vector,
    radius: number,
    canvasCtx: CanvasRenderingContext2D,
    width: number = 1,
    color: string = '#000000'
): Circle {
    return new Circle(
        new Vector(position.x, position.y),
        radius,
        canvasCtx,
        width,
        color
    );
}

class Circle extends Form {
    public position: Vector;
    public radius: number;
    public ctx: CanvasRenderingContext2D;
    public width: number;
    public color: string;
    constructor(
        position: Vector,
        radius: number,
        canvasCtx: CanvasRenderingContext2D,
        width: number,
        color: string
    ) {
        super();
        this.width = width;
        this.color = color;
        this.position = position;
        this.radius = radius;
        this.ctx = canvasCtx;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            2 * Math.PI
        );
        this.ctx.lineWidth = this.width;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }
}
