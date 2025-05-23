// 5차 전직
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '16112.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

const [n, k] = input[0].split(' ').map(BigInt);
const arr = input[1].split(' ').map(BigInt);

arr.sort((a, b) => {
  if (a < b) return -1;
  else if (a > b) return 1;
  return 0;
});

let sum = 0n;
for (let [index, ex] of arr.entries()) {
  index = BigInt(index);
  if (index < k) {
    sum += ex * index;
  } else {
    sum += ex * k;
  }
}
console.log(sum.toString());
