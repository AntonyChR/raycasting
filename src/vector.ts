
export default class Vector {
    public x: number;
    public y: number;
    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    scalarProduct(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    crossProduct(other: Vector): Vector {
        return new Vector(this.x * other.y - this.y * other.x, this.x * other.y + this.y * other.x);
    }

    norm(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
