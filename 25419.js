const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '25419.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

// 1 ~ k
const dp = Array.from({ length: n + 1 }, () => 0);
for (let i = 0; i < arr.length; i++) {
  dp[arr[i]] = 10000;
}

let maxN = n;
for (let i = 1; i <= n - k; i++) {
  let all = true;
  for (let j = 0; j < k; j++) {
    if (dp[i + j] != 10000) {
      all = false;
      break;
    }
  }
  if (all) {
    maxN = i - 1;
    break;
  }
}

for (let i = maxN; i > 0; i--) {
  if (dp[i] == 10000) {
    continue;
  }
  let temp = 1;
  for (let j = i + 1; j < i + 1 + k; j++) {
    if (j > n) break;
    if (dp[j] == 10000) continue;
    else if (dp[j] == 1) {
      temp = 0;
      break;
    }
  }
  dp[i] = temp;
}

let ans = 0;
for (let i = 1; i <= k; i++) {
  if (dp[i] == 1) {
    ans = 1;
    break;
  }
}
console.log(ans);
