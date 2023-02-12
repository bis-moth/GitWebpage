export const pi = Math.PI;
export const pi2 = 2*pi;
export const pi05 = pi/2;

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

export function getRandomBoolean() {
    return Math.sign(getRandomArbitrary(-1,1));
}