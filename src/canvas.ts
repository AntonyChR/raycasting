export const createCanvas = (
    width: number = 500,
    height: number = 500,
    wrapperId?: string
): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    if (wrapperId) {
        document.getElementById(wrapperId)?.appendChild(canvas);
    } else {
        document.body.appendChild(canvas);
    }

    return canvas;
};
