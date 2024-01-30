export default class Vector {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    scalarProduct(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }

    norm(other?: Vector): number {
        if (other) {
            let t = this.add(other.scalarProduct(-1)); // norm(this - other)
            return Math.sqrt(t.x ** 2 + t.y ** 2);
        }
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    minus(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    projectedOnto(other: Vector): Vector {
        let sc = this.dot(other) / other.dot(other);
        return other.scalarProduct(sc);
    }

    static fromAngle(norm: number = 1, angle: number) {
        return new Vector(norm * Math.cos(angle), norm * Math.sin(angle));
    }
}
