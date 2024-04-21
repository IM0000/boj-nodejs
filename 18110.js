const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '18110.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const arr = input.slice(1).map(Number);
if(n == 0) {
  console.log(0);
} else {
  let cut = Math.round(n * 15 / 100);
  arr.sort((a, b) => a - b);
  
  // 맨 앞, 맨 뒤의 cut 크기 만큼 제외함.
  let avg = arr.slice(cut, n - cut).reduce((a, b) => a + b, 0) / (n - 2 * cut);
  avg = Math.round(avg);
  
  console.log(avg);
}