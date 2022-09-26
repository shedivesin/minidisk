"use strict";
const assert = require("assert");
const minidisk = require("./");

describe("minidisk", () => {
  for(const [name, input, output] of [
    ["an empty list", [], [0, 0, 0]],
    ["a point at the origin", [[0, 0]], [0, 0, 0]],
    ["an arbitrary point", [[42, -14]], [42, -14, 0]],
    ["two symmetric points", [[-1, 0], [1, 0]], [0, 0, 1]],
    ["two arbitrary points", [[0, -3], [4, 0]], [2, -1.5, 2.5]],
    ["three symmetric points", [[-1, 0], [0, -1], [0, 1]], [0, 0, 1]],
    [
      "an equilateral triangle",
      [[0, -2], [Math.sqrt(3), 1], [-Math.sqrt(3), 1]],
      [0, 0, 2],
    ],
    ["a square", [[0, -1], [1, 0], [0, 1], [-1, 0]], [0, 0, 1]],
    [
      "a regular pentagon",
      [
        [0, -4],
        [Math.sqrt(10 + 2 * Math.sqrt(5)), 1 - Math.sqrt(5)],
        [Math.sqrt(10 - 2 * Math.sqrt(5)), 1 + Math.sqrt(5)],
        [-Math.sqrt(10 - 2 * Math.sqrt(5)), 1 + Math.sqrt(5)],
        [-Math.sqrt(10 + 2 * Math.sqrt(5)), 1 - Math.sqrt(5)],
      ],
      [0, 0, 4],
    ],
  ]) {
    it(`should return the minimum bounding disk of ${name}`, () => {
      assert.deepStrictEqual(minidisk(input), output);
    });
  }
});
