const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23814.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const D = BigInt(input[0].trim());
const [N, M, K] = input[1].trim().split(' ').map(BigInt);

const n2 = N % D;
const m2 = M % D;
const maxMandu = (N + M + K) / D;
const cases = [];
const friedCases = [];

cases[0] = N / D + M / D + K / D;
friedCases[0] = K;
cases[1] = (N + (D - n2)) / D + M / D + (K - (D - n2)) / D;
friedCases[1] = K - (D - n2);
cases[2] = N / D + (M + (D - m2)) / D + (K - (D - m2)) / D;
friedCases[2] = K - (D - m2);
cases[3] =
  (N + (D - n2)) / D + (M + (D - m2)) / D + (K - (D - n2) - (D - m2)) / D;
friedCases[3] = K - (D - n2) - (D - m2);

let fried = 0;
for (let i = 0; i < 4; i++) {
  if (cases[i] === maxMandu && fried < friedCases[i]) {
    fried = friedCases[i];
  }
}

console.log(fried.toString());
