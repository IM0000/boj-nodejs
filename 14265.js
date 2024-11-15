// 영선수열
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14265.txt';
const [K, A, B] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);
// 60, 30, 15, 14, 7, 6,
function sum(x, k) {
  if (x < 0n) return 0n;
  if (k == 0n) return x + 1n;
  let s = k;
  let e = k;
  let result = 0n;
  if (e % 2n == 0n) e++;

  while (s <= x) {
    if (e < x) {
      result += e - s + 1n;
    } else {
      result += x - s + 1n;
    }
    s = s * 2n;
    e = e * 2n + 1n;
  }

  return result;
}

let ans = sum(B, K) - sum(A - 1n, K);
console.log(ans.toString());
