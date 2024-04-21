const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2166.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const n = +input[index++];
const points = [];
for(let i=0; i<n; i++) {
  const [x, y] = input[index++].split(' ').map(Number);
  points.push([x, y]);
}

const v = [[0,0]]; // 벡터 배열(첫번째 점 기준)
for(let i=1; i<n; i++) {
  v.push(vector(points[0], points[i]));
}

let sum = 0;
for(let i=0; i<n-1; i++) {
  sum += crossProduct(v[i], v[i+1]);
}

console.log(Math.abs(sum/2).toFixed(1)); // 절댓값 출력

function crossProduct(v1, v2) {
  return v1[0]*v2[1] - v1[1]*v2[0];
}

function vector(p1, p2) {
  return [p2[0]-p1[0], p2[1]-p1[1]];
}