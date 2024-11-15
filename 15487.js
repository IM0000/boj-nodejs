const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15487.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const arr = input[1].split(' ').map(Number);

let ans = -9999999;
const ldp = Array(N).fill(-9999999);
const rdp = Array(N).fill(-9999999);

let min = arr[0];
for (let i = 1; i < N - 2; i++) {
  ldp[i] = Math.max(ldp[i - 1], arr[i] - min);
  if (min > arr[i]) min = arr[i];
}

let max = arr[N - 1];
for (let i = N - 2; i >= 2; i--) {
  rdp[i] = Math.max(rdp[i + 1], max - arr[i]);
  ans = Math.max(ans, ldp[i - 1] + rdp[i]);
  if (max < arr[i]) max = arr[i];
}
console.log(ans);
