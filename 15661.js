const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15661.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const board = input.slice(1).map(line => line.split(' ').map(Number));

let tot = 0;
let sum = Array.from({ length: N }).fill(0);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    tot += board[i][j];
    sum[i] += board[i][j];
    sum[j] += board[i][j];
  }
}

let min = Number.MAX_SAFE_INTEGER;
let isUsed = Array.from({ length: N }, () => 0);

// p: 현재까지 팀원의 수, o: 현재까지 탐색된 팀원의 인덱스, t: 최종 팀원 수
function bt(p, o, t) {
  if(p == t) {
    let temp = 0;
    for(let j=0; j<N; j++) if(isUsed[j]) temp += sum[j];
    min = Math.min(min, Math.abs(tot - temp));
    return;
  }

  for(let i=o; i<N; i++) {
    isUsed[i] = 1;
    bt(p+1, i+1, t);
    isUsed[i] = 0;
  }
}

for(let i=0; i < N/2 + 1; i++) bt(0,0,i);

console.log(min);
