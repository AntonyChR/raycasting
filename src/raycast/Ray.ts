import { Line, NewLine } from '../forms/Line';
import Vector from '../vector/vector';
import { Boundary } from './Boundary';

export class Ray {
    public pos: Vector;
    public dir: Vector;
    public line: Line;

    constructor(x: number, y: number, canvasCtx: CanvasRenderingContext2D) {
        this.pos = new Vector(x, y);
        this.dir = new Vector(10, 0);

        this.line = NewLine(this.pos, this.pos.add(this.dir), canvasCtx, 1);
    }

    lookAt(x:number,y:number){
        this.dir.x = x - this.pos.x
        this.dir.y = y - this.pos.y

        this.dir = this.dir.scalarProduct(1/this.dir.norm())
    }

    cast(w: Boundary): undefined | Vector{
        const x1 = w.a.x;
        const y1 = w.a.y;

        const x2 = w.b.y;
        const y2 = w.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;

        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den == 0) {
            return undefined;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            
            const pt = new Vector(0,0)
            pt.x = x1 + t * (x2 - x1)
            pt.y = y1 + t * (y2 - y1)
            return pt;
        }

        return undefined;
    }


    draw() {
        this.line.end = this.pos.add(this.dir.scalarProduct(50))
        this.line.draw();
    }
}
