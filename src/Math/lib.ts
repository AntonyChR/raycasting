export const toRadians = (angle: number) => {
    return (angle / 180) * Math.PI;
};

/**
 * Normalizes a value within a specific range and scales it to another desired range.
 *
 * @param value - The value to normalize.
 * @param rmin - The minimum value of the original range.
 * @param rmax - The maximum value of the original range.
 * @param tmin - The minimum value of the new desired range.
 * @param tmax - The maximum value of the new desired range.
 * @returns The normalized value adjusted to the new range.
 */

export function normalize(
    value: number,
    rmin: number,
    rmax: number,
    tmin: number,
    tmax: number
): number {
    return ((value - rmin) / (rmax - rmin)) * (tmax - tmin) + tmin;
}
