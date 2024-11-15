const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '26216.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

function log_base(num, base) {
  let ans = 0n;
  while (num % base === 0n) {
    num /= base;
    ans++;
  }
  return ans;
}

function bigIntPow(base, exp) {
  let result = 1n;
  let bigBase = BigInt(base);
  let bigExp = BigInt(exp);

  while (bigExp > 0n) {
    if (bigExp % 2n === 1n) {
      result *= bigBase;
    }
    bigBase *= bigBase;
    bigExp /= 2n;
  }

  return result;
}

const [K, H, Q] = input[0].split(' ').map(Number);
const factor = BigInt(K + 1);
const maxNode = bigIntPow(factor, H);

let output = [];

for (let i = 1; i <= Q; i++) {
  let [A, B] = input[i].split(' ').map(BigInt);

  if (A >= maxNode || B >= maxNode) {
    output.push(-1);
  } else if (A === B) {
    output.push(0);
  } else {
    let height_A = log_base(A, factor);
    let height_B = log_base(B, factor);
    let LCA = BigInt(Math.max(Number(height_A), Number(height_B)) + 1);
    let p = bigIntPow(factor, LCA);

    while (A / p !== B / p) {
      LCA++;
      p *= factor;
    }

    let result = LCA - height_A + (LCA - height_B);
    output.push(result.toString());
  }
}

console.log(output.join('\n'));
