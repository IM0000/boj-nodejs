const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '21758.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const arr = input.shift().split(' ').map(Number);
const sum = Array.from({ length: N }, () => 0);
for(let i=0; i<N; i++) {
  sum[i] = arr[i] + (i ? sum[i-1] : 0);
}

// a, b, 집
let max1 = 0;
let c1 = sum[N-1] - arr[0];
for(let i=1; i<N-1; i++) {
  max1 = Math.max(max1, c1 + sum[N-1] - sum[i] - arr[i]);
}
// a, 집, b
let max2 = 0;
for(let i=0; i<N-1; i++) {
  max2 = Math.max(max2, sum[N-2] - arr[0] + arr[i]);
}
// 집, a, b
let max3 = 0;
let c3 = sum[N-2];
for(let i=1; i<N-1; i++) {
  max3 = Math.max(max3, c3 + sum[i-1] - arr[i]);
}

let answer = Math.max(max1, max2, max3);
console.log(answer);