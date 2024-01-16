export default abstract class Form {
    abstract ctx: CanvasRenderingContext2D;
    abstract lineWidth: number;
    abstract draw(): void;
}
