"use strict";

function assert(x, message) {
  if(!x) { throw new Error(message); }
}

function incircle(p, a, b, c) {
  if(a === undefined) { return false; }

  const ax = a[0] - p[0];
  const ay = a[1] - p[1];
  if(b === undefined) { return ax === 0 && ay === 0; }

  let bx = b[0] - p[0];
  let by = b[1] - p[1];
  if(c === undefined) { return ax * bx + ay * by <= 0; }

  let cx = c[0] - p[0];
  let cy = c[1] - p[1];
  const orientation = Math.sign((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));

  const a_sq = ax * ax + ay * ay;
  const b_sq = bx * bx + by * by;
  const c_sq = cx * cx + cy * cy;
  const determinant = ax * (by * c_sq - b_sq * cy) - ay * (bx * c_sq - b_sq * cx) + a_sq * (bx * cy - by * cx);

  return orientation * determinant >= 0;
}

function minidisk(p) {
  const n = p.length;

  // FIXME: shuffle p

  // find the supporting points of the bounding circle
  let a = -1, b = -1, c = -1;
  for(let i = 0; i < n; i++) {
    if(!incircle(p[i], p[a], p[b], p[c])) {
           if(b > i) { c = i; }
      else if(a > i) { b = i; c = i = -1; }
      else           { a = i; b = c = i = -1; }
    }
  }

  if(a < 0) {
    return [0, 0, 0];
  }

  const [ax, ay] = p[a];
  if(b < 0) {
    return [ax, ay, 0];
  }

  let [bx, by] = p[b];
  bx -= ax;
  by -= ay;
  if(c < 0) {
    bx /= 2;
    by /= 2;
    return [ax + bx, ay + by, Math.hypot(bx, by)];
  }

  let [cx, cy] = p[c];
  cx -= ax;
  cy -= ay;
  const b_sq = bx * bx + by * by;
  const c_sq = cx * cx + cy * cy;
  const d = (bx * cy - by * cx) * 2;
  const u = (cy * b_sq - by * c_sq) / d;
  const v = (bx * c_sq - cx * b_sq) / d;
  return [ax + u, ay + v, Math.hypot(u, v)];
}

module.exports = minidisk;
