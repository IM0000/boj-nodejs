// 치킨 쿠폰
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1673.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const answer = [];
let index = 0;

while (index < input.length) {
  const [n, k] = input[index++].split(' ').map(Number);
  answer.push(getAnswer(n, k));
}
console.log(answer.join('\n'));

function getAnswer(n, k) {
  let ans = n;
  let temp = n;

  while (temp >= k) {
    let c = Math.floor(temp / k);
    ans += c;
    temp -= c * (k - 1);
  }

  return ans;
}
