const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1621.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const [K, C] = input[1].trim().split(' ').map(Number);
const arr = [0, ...input[2].trim().split(' ').map(Number)];

const dp = Array(N + 1).fill(0);

let useIdx = [0, 0];

dp[0] = 0;
dp[1] = arr[1];
for (let i = 2; i < K; i++) {
  dp[i] = dp[i - 1] + arr[i];
  useIdx.push(0);
}

for (let i = K; i <= N; i++) {
  if (dp[i - 1] + arr[i] > dp[i - K] + C) {
    dp[i] = dp[i - K] + C;
    useIdx.push(i - K + 1);
  } else {
    dp[i] = dp[i - 1] + arr[i];
    useIdx.push(0);
  }
}

for (let i = useIdx.length - 1; i >= K - 1; i--) {
  if (useIdx[i] !== 0) {
    for (let j = 1; j < K; j++) {
      useIdx[i - j] = 0;
    }
    i -= K - 1;
  }
}

let idx = [];
for (let i = 0; i < useIdx.length; i++) {
  if (useIdx[i] !== 0) {
    idx.push(useIdx[i]);
  }
}

const ans = [];
ans.push(dp[N]);
ans.push(idx.length);
ans.push(idx.join(' '));
console.log(ans.join('\n'));
