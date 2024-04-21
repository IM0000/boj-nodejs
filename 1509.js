const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1509.txt';
const input = fs.readFileSync(filePath).toString().trim();

const N = input.length;
// dp[s][e] : s부터 e까지 문자열이 팰린드롬인지 여부
const dp = Array.from({ length: N }, () => Array(N).fill(0));

// 초기값
for (let i = 0; i < N; i++) {
  dp[i][i] = 1;
  if(i < N-1) dp[i][i+1] = input[i] === input[i+1] ? 1:0;
  if(i < N-2) dp[i][i+2] = input[i] === input[i+2] ? 1:0;
}

if(N>3) {
  for(let i = N-4; i>=0; i--) {
    for(let j = i+3; j<N; j++) {
      dp[i][j] = input[i] === input[j] && dp[i+1][j-1] ? 1:0;
    }
  }
}

const ddp = Array(N).fill(Number.MAX_SAFE_INTEGER);
ddp[0] = 1; // 0번 인덱스까지 고려했을 때 최소 팰린드롬 수
for(let i = 1; i<N; i++) {
  if(dp[0][i]) ddp[i] = 1;
  else {
    for(let j = 0; j<i; j++) {
      if(dp[j+1][i]) ddp[i] = ddp[j] + 1;
    }
  }
}

console.log(ddp[N-1]);
console.log(ddp.join('  '))


print2DArray(dp);

function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join('  '));
  }
}