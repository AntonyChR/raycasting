export default abstract class Form {
    abstract ctx: CanvasRenderingContext2D;
    abstract width: number;
    abstract draw(): void;
    abstract color: string;
}
