const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11660.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);
const map = Array.from(Array(N+1), ()=>Array(N+1).fill(0));

for(let i=0; i<N; i++) {
  map[i+1] = [0, ...input[index++].split(' ').map(Number)];
}

// 구간합 배열
const dp = Array.from(Array(N+1), ()=>Array(N+1).fill(0));
for(let i=1; i<=N; i++) {
  for(let j=1; j<=N; j++) {
    dp[i][j] = map[i][j] + dp[i-1][j] + dp[i][j-1] - dp[i-1][j-1];
  }
}

const answer = [];
for(let i=0; i<M; i++) {
  const [x1,y1,x2,y2] = input[index++].split(' ').map(Number);
  const [a,b] = [x1-1, y1-1];
  const temp = dp[x2][y2] 
    - (b>0 ? dp[x2][b] : 0) 
    - (a>0 ? dp[a][y2] : 0) 
    + (a>0 && b>-1 ? dp[a][b] : 0);
  answer.push(temp);
}

console.log(answer.join('\n'));