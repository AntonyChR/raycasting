import { Line, NewLine } from "../forms/Line";
import Vector from "../vector/vector";

export class Boundary {
    public a: Vector
    public b: Vector
    public line: Line
    constructor(x1:number,y1:number,x2:number,y2:number, canvasCtx: CanvasRenderingContext2D){
        this.a = new Vector(x1,y1)
        this.b = new Vector(x2,y2)
        this.line = NewLine(this.a,this.b,canvasCtx)        
    }

    draw(){
        this.line.draw()
    }
}