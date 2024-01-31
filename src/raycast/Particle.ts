import { toRadians } from '../Math/lib';
import { NewLine } from '../forms/Line';
import Vector from '../vector/vector';
import { Boundary } from './Boundary';
import { Ray } from './Ray';

export class Particle {
    public pos: Vector;
    public rays: Ray[];
    public canvasCtx: CanvasRenderingContext2D;
    constructor(canvasCtx: CanvasRenderingContext2D) {
        this.canvasCtx = canvasCtx;
        this.pos = new Vector(250, 250);
        this.rays = [];
        for (let angle = 0; angle < 50; angle += 1) {
            this.rays.push(new Ray(this.pos, toRadians(angle)));
        }
    }

    update(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;
    }

    look(walls: Boundary[]): number[] {
        const scene = []
        for (let i = 0; i< this.rays.length; i++) {
            const ray = this.rays[i]
            let closestWall = null;
            let record: number = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = this.pos.norm(pt);
                    if (d < record) {
                        record = d;
                        closestWall = pt;
                    }
                }
            }
            if(closestWall){
                NewLine(this.pos, closestWall, this.canvasCtx, 1, 'white').draw();
            }
            scene[i] = record;
            
        }
        return scene
    }

}
