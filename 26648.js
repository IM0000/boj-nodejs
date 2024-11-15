const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '26684.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const A = input[1].split(' ').map(Number);
const B = input[2].split(' ').map(Number);
const C = input[3].split(' ').map(Number);

function isPossiblePortfolio(N, A, B, C) {
  let previousMedian = -1;

  for (let i = 0; i < N; i++) {
    let scores = [A[i], B[i], C[i]];
    scores.sort((x, y) => x - y);
    let tmp;

    if (i == 0) {
      previousMedian = scores[0];
      continue;
    }

    tmp = scores[0];

    if (tmp <= previousMedian) {
      tmp = previousMedian + 1;
    }

    if (tmp > scores[2]) {
      return 'NO';
    }

    previousMedian = tmp;
  }

  return 'YES';
}

console.log(isPossiblePortfolio(N, A, B, C));
