export default class Vector {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    scalarMultiplication(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    norm(v?: Vector): number {
        if (v) {
            let t = this.add(v.scalarMultiplication(-1));
            return Math.sqrt(t.x ** 2 + t.y ** 2);
        }
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    minus(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    projectedOnto(v: Vector): Vector {
        let sc = this.dot(v) / v.dot(v);
        return v.scalarMultiplication(sc);
    }

    getAngle(): number {
        return Math.atan2(this.y, this.x);
    }

    static fromAngle(norm: number = 1, angle: number) {
        return new Vector(norm * Math.cos(angle), norm * Math.sin(angle));
    }
}
