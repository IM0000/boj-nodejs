const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16936.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0].trim();
const arr = input[1].trim().split(' ').map(BigInt);

const count23 = (num) => {
  let cnt2 = 0;
  let cnt3 = 0;

  while (num % 2n === 0n) {
    num /= 2n;
    cnt2++;
  }

  while (num % 3n === 0n) {
    num /= 3n;
    cnt3++;
  }

  return [cnt2, cnt3];
};

let convertArr = [];
for (let i = 0; i < N; i++) {
  convertArr.push([count23(arr[i]), arr[i]]);
}

const answer = convertArr
  .sort((a, b) => {
    if (a[0][1] === b[0][1]) {
      return a[0][0] - b[0][0];
    }
    return b[0][1] - a[0][1];
  })
  .map((v) => v[1].toString());

console.log(answer.join(' '));
