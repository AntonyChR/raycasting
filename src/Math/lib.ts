export const toRadians = (angle: number) => {
    return (angle / 180) * Math.PI;
};

export function normalize(
    value: number,
    rmin: number,
    rmax: number,
    tmin: number,
    tmax: number
): number {
    return ((value - rmin) / (rmax - rmin)) * (tmax - tmin) + tmin;
}
