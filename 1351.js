// 무한 수열
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1351.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');
const [N, P, Q] = input.map(BigInt);

const dp = new Map();
dp.set(0n, 1n);

function infiniteSeq(n) {
  if (dp.has(n)) {
    return dp.get(n);
  }
  dp.set(n, infiniteSeq(n / P) + infiniteSeq(n / Q));
  return dp.get(n);
}

console.log(infiniteSeq(N).toString());
