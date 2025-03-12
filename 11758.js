// ccw
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11758.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const p1 = input[0].split(' ').map(Number);
const p2 = input[1].split(' ').map(Number);
const p3 = input[2].split(' ').map(Number);

function getVector(point1, point2) {
  return [point2[0] - point1[0], point2[1] - point1[1]];
}
function crossVector(v1, v2) {
  return v1[0] * v2[1] - v1[1] * v2[0];
}
function ccw(p1, p2, p3) {
  const v1 = getVector(p1, p2);
  const v2 = getVector(p2, p3);
  const result = crossVector(v1, v2);
  if (result > 0) return 1;
  if (result < 0) return -1;
  return 0;
}

console.log(ccw(p1, p2, p3));
