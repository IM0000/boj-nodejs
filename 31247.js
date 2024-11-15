// 2024는 무엇이 특별할까?
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31247.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let T = +input.shift();
const answer = [];
let index = 0;
// N = 2^t * a (a는 홀수)를 만족하는 N의 갯수를 찾으면 됨
// 여기서 t = k가 되어야하므로, 2^k로는 나누어 떨어지나 2^(k+1)로는 나누어 떨어지지 않는 (=홀수조건)
while (T--) {
  let [n, k] = input[index++].split(' ').map(BigInt);
  if (n < k) {
    answer.push(0n);
    continue;
  }

  // while (n && k) {
  //   n /= 2n;
  //   k--;
  // }

  answer.push((n >> k) - (n >> (k + 1n))); // 나누기 2하는 것은 홀수 조건 만족해야하기 때문에
}
console.log(answer.join('\n'));
