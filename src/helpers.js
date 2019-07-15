export function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export function outCubic(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (4.1525 * tc * ts + -8.9025 * ts * ts + 4 * tc + 1.5 * ts + 0.25 * t);
}