const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '22981.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(BigInt);
const arr = input[1].split(' ').map(BigInt);
arr.sort((a, b) => (a > b ? 1 : -1));

let max = arr[0] + (N - 1n) * arr[1];
for (let i = 1n; i < N; i++) {
  let num = i * arr[0] + (N - i) * arr[i];
  if (num > max) {
    max = num;
  }
}
let answer = K % max === 0n ? K / max : K / max + 1n;
console.log(answer.toString());
