// 순열의 순서
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1722.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const factorial = [1n];
for (let i = 1n; i <= 20n; i++) {
  factorial[i] = factorial[i - 1n] * i;
}

let n = BigInt(input[0]);
let [cmd, ...arr] = input[1].split(' ').map(BigInt);
if (cmd === 1n) {
  let answer = [];
  let k = arr[0];
  let check = Array(n + 1n).fill(false);

  for (let i = 0n; i < n; i++) {
    for (let j = 1n; j <= n; j++) {
      if (check[j]) continue;
      if (factorial[n - i - 1n] < k) {
        k -= factorial[n - i - 1n];
      } else {
        answer.push(j);
        check[j] = true;
        break;
      }
    }
  }

  console.log(answer.join(' '));
} else {
  let k = 1n;
  let check = Array(n + 1n).fill(false);
  for (let i = 0n; i < n; i++) {
    let cnt = 0n;
    for (let j = 1n; j < arr[i]; j++) {
      if (!check[j]) cnt++;
    }
    k += cnt * factorial[n - i - 1n];
    check[arr[i]] = true;
  }

  console.log(k.toString());
}
