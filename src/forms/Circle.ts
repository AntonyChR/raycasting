import Vector from "../vector/vector";
import Form from "./Form";

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
    public lineWidth: number;
    public lineColor: string;
    constructor(
        position: Vector,
        radius: number,
        canvasCtx: CanvasRenderingContext2D,
        width: number,
        color: string
    ) {
        super();
        this.lineWidth = width;
        this.lineColor = color;
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
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.stroke();
    }
}
