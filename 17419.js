const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17419.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const K = input.shift();
let cnt = 0;
for (let i = 0; i < K.length; i++) {
  if (K[i] == 1) cnt++;
}
console.log(cnt);
