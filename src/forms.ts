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
    lineWidth: number = 1
): Line {
    return new Line(
        new Vector(start.x, start.y),
        new Vector(end.x, end.y),
        lineWidth,
        canvasCtx!
    );
}

export class Line extends Form {
    public start: Vector;
    public end: Vector;
    public lineWidth: number;
    public ctx: CanvasRenderingContext2D;
    constructor(
        start: Vector,
        end: Vector,
        width: number = 5,
        canvasCtx: CanvasRenderingContext2D
    ) {
        super();
        this.start = start;
        this.end = end;
        this.lineWidth = width;
        this.ctx = canvasCtx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(this.end.x, this.end.y);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
    }
}

export function NewCircle(
    position: Coordinates | Vector,
    radius: number,
    canvasCtx: CanvasRenderingContext2D
): Circle {
    return new Circle(new Vector(position.x, position.y), radius, canvasCtx);
}

class Circle extends Form {
    public position: Vector;
    public radius: number;
    public ctx: CanvasRenderingContext2D;
    public lineWidth: number;
    constructor(
        position: Vector,
        radius: number,
        canvasCtx: CanvasRenderingContext2D
    ) {
        super();
        this.lineWidth = 1;
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
        this.ctx.stroke();
    }
}
