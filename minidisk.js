"use strict";

// Returns the determinant of a 2x2 matrix given in row-major order.
function det2(a, b, c, d) {
  return a * d - b * c;
}

// Returns the determinant of a 3x3 matrix given in row-major order.
function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - b * det2(d, f, g, i) + c * det2(d, e, g, h);
}

// Is P in the circle defined by points A, B, and C?
// NB: This will work even if given no points, only A, or only A and B.
function in_circle(p, a, b, c) {
  // Circle undefined.
  if(a === undefined) { return false; }

  // Circle defined by A only.
  const ax = a[0] - p[0];
  const ay = a[1] - p[1];
  if(b === undefined) { return ax === 0 && ay === 0; }

  // Circle defined by A and B.
  const bx = b[0] - p[0];
  const by = b[1] - p[1];
  if(c === undefined) { return ax * bx + ay * by <= 0; }

  // Circle defined by A, B, and C.
  const cx = c[0] - p[0];
  const cy = c[1] - p[1];
  const orientation = det2(
    bx - ax, by - ay,
    cx - ax, cy - ay,
  );
  const determinant = det3(
    ax, ay, ax * ax + ay * ay,
    bx, by, bx * bx + by * by,
    cx, cy, cx * cx + cy * cy,
  );
  return Math.sign(orientation) * determinant >= 0;
}

// What is the smallest circle through points A, B, and C?
// NB: This will work even if given no points, only A, or only A and B.
function circle_through(a, b, c) {
  // No supporting points.
  if(a === undefined) { return [0, 0, 0]; }

  // One supporting point.
  const ax = a[0];
  const ay = a[1];
  if(b === undefined) { return [ax, ay, 0]; }

  // Two supporting points.
  const bx = b[0] - ax;
  const by = b[1] - ay;
  if(c === undefined) {
    return [ax + bx / 2, ay + by / 2, Math.hypot(bx, by) / 2];
  }

  // Three supporting points.
  const cx = c[0] - ax;
  const cy = c[1] - ay;
  const b_sq = bx * bx + by * by;
  const c_sq = cx * cx + cy * cy;
  const d = bx * cy - by * cx;
  const u = (cy * b_sq - by * c_sq) / d;
  const v = (bx * c_sq - cx * b_sq) / d;
  return [ax + u / 2, ay + v / 2, Math.hypot(u, v) / 2];
}

function minidisk(p) {
  const n = p.length;

  // FIXME: shuffle p

  // Find the supporting points of the bounding circle.
  let a = -1, b = -1, c = -1;
  for(let i = 0; i < n; i++) {
    // NB: a, b, or c may be -1. p[a], p[b], p[c] may therefore be undefined.
    if(!in_circle(p[i], p[a], p[b], p[c])) {
           if(b > i) { c = i; }
      else if(a > i) { b = i; c = i = -1; }
      else           { a = i; b = c = i = -1; }
    }
  }

  // Return the smallest circle through those supporting points.
  // NB: a, b, or c may be -1. p[a], p[b], p[c] may therefore be undefined.
  return circle_through(p[a], p[b], p[c]);
}

module.exports = minidisk;
