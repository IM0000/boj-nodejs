const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2477.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const K = +input[index++];
const arr = [];

// 동쪽은 1, 서쪽은 2, 남쪽은 3, 북쪽은 4
for(let i=0; i<6; i++) {
  arr.push(input[index++].split(' ').map(Number));
}

let xMax = Number.MIN_SAFE_INTEGER;
let xMin = Number.MAX_SAFE_INTEGER;
let yMax = Number.MIN_SAFE_INTEGER;
let yMin = Number.MAX_SAFE_INTEGER;
let point = [];
let dp = [0, 0]; // [x, y]
for(let i=0; i<6; i++) {
  let [d, size] = arr[i];
  if(d === 1) {
    dp[0] += size;
    if(xMax < dp[0]) {
      xMax = dp[0];
    }
    point.push([...dp]);
  } else if(d === 2) {
    dp[0] -= size;
    if(xMin > dp[0]) {
      xMin = dp[0];
    }
    point.push([...dp]);
  } else if(d === 3) {
    dp[1] -= size;
    if(yMin > dp[1]) {
      yMin = dp[1];
    }
    point.push([...dp]);
  } else if(d === 4) {
    dp[1] += size;
    if(yMax < dp[1]) {
      yMax = dp[1];
    }
    point.push([...dp]);
  }
}

const middle = point.filter(p => p[0] !== xMax && p[0] !== xMin && p[1] !== yMax && p[1] !== yMin)[0];
  
const xMid = point.filter(p => p[0] === middle[0]);
const yMid = point.filter(p => p[1] === middle[1]);

const sY = Math.abs(xMid[0][1] - xMid[1][1]);
const sX = Math.abs(yMid[0][0] - yMid[1][0]);

const lArea = (xMax - xMin) * (yMax - yMin);

console.log((lArea - sX * sY) * K);