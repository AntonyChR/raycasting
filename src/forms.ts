import Vector from './vector';

interface Coordinates {
    x: number;
    y: number;
}

export function NewLine(
    start: Coordinates,
    end: Coordinates,
    canvasCtx: CanvasRenderingContext2D,
    lineWidth: number = 5
): Line {
    return new Line(
        new Vector(start.x, start.y),
        new Vector(end.x, end.y),
        lineWidth,
        canvasCtx!
    );
}

class Line {
    public start: Vector;
    public end: Vector;
    public width: number;
    public canvasCtx: CanvasRenderingContext2D;
    constructor(
        start: Vector,
        end: Vector,
        width: number = 5,
        canvasCtx: CanvasRenderingContext2D
    ) {
        this.start = start;
        this.end = end;
        this.width = width;
        this.canvasCtx = canvasCtx;
    }

    draw() {
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(this.start.x, this.start.y);
        this.canvasCtx.lineTo(this.end.x, this.end.y);
        this.canvasCtx.lineWidth = this.width;
        this.canvasCtx.stroke();
    }
}

export function NewCircle(
    position: Coordinates,
    radius: number,
    canvasCtx: CanvasRenderingContext2D
): Circle {
    return new Circle(new Vector(position.x, position.y), radius, canvasCtx);
}

class Circle {
    public position: Vector;
    public radius: number;
    public canvasCtx: CanvasRenderingContext2D;
    constructor(
        position: Vector,
        radius: number,
        canvasCtx: CanvasRenderingContext2D
    ) {
        this.position = position;
        this.radius = radius;
        this.canvasCtx = canvasCtx;
    }
    draw() {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(100, 75, 50, 0, 2 * Math.PI);
        this.canvasCtx.stroke();
    }
}
