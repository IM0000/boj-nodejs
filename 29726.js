const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '29726.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let arr = input[1].split(' ').map(Number);

for (let i = 1; i < N; i++) {
  arr.push(arr[i] - arr[i - 1]);
}

let minArr = [arr[0]];
for (let i = 1; i < arr.length; i++) {
  minArr[i] = Math.min(minArr[i - 1], arr[i]);
}

let max = Number.MIN_SAFE_INTEGER;
for (let i = N - 1; i >= N - 1 - M; i--) {
  max = Math.max(max, arr[i] - minArr[i - (N - 1 - M)]);
}

console.log(max);
