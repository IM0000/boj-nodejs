const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1437.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0]);

console.log(solution(N));

function solution(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  let tr = 0;
  let tw = 0;

  if (n % 3 === 1) {
    tr = Math.floor(n / 3) - 1;
    tw = 2;
  } else {
    tr = Math.floor(n / 3);
    if (n % 3 === 2) {
      tw = 1;
    }
  }

  let trSum = 1;
  for (let i = 0; i < tr; i++) {
    trSum = (trSum * 3) % 10007;
  }

  let twSum = 1;
  for (let i = 0; i < tw; i++) {
    twSum = (twSum * 2) % 10007;
  }

  return (trSum * twSum) % 10007;
}
