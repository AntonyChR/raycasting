import { toRadians } from '../Math/lib';
import { Circle, NewCircle } from '../forms/Circle';
import { NewLine } from '../forms/Line';
import Vector from '../vector/vector';
import { Boundary } from './Boundary';
import { Ray } from './Ray';

export class Particle {
    public pos: Vector;
    public rays: Ray[];
    public circle: Circle;
    public canvasCtx: CanvasRenderingContext2D;
    constructor(canvasCtx: CanvasRenderingContext2D) {
        this.canvasCtx = canvasCtx;
        this.pos = new Vector(250, 250);
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 10) {
            this.rays.push(new Ray(this.pos, toRadians(angle)));
        }
        this.circle = NewCircle(this.pos, 10, canvasCtx);
    }

    update(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    look(w: Boundary) {
        for (let i = 0; i < this.rays.length; i++) {
            const r = this.rays[i];
            let pt = r.cast(w);
            if (pt) {
                NewLine(this.pos,pt,this.canvasCtx,1,'red').draw()
            }
        }
    }

    draw() {
        this.circle.draw();
    }
}

