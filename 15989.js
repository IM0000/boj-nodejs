const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15989.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
let T = +input[index++].trim();

// dp[a][b] : 오름차순으로 a 숫자를 만드는데 b가 마지막으로 오는 경우의 수
let dp = Array.from({length: 10001}, () => Array(4).fill(0));
dp[1][1] = 1;
dp[2][1] = 1;
dp[2][2] = 1;
dp[3][1] = 1;
dp[3][2] = 1;
dp[3][3] = 1;

for(let i=4; i<=10000; i++) {
  dp[i][1] = dp[i-1][1];
  dp[i][2] = dp[i-2][2] + dp[i-2][1];
  dp[i][3] = dp[i-3][3] + dp[i-3][2] + dp[i-3][1];
}

let answer = [];
while(T--) {
  let num = +input[index++].trim();
  answer.push(dp[num][1]+dp[num][2]+dp[num][3]);
}

console.log(answer.join('\n'));