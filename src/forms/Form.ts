export default abstract class Form {
    abstract ctx: CanvasRenderingContext2D;
    abstract lineWidth: number |null;
    abstract draw(): void;
    abstract lineColor: string |null;
}
