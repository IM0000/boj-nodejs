const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2342.txt';
const arr = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);

if(arr[0] === 0) {
  console.log(0);
  process.exit();
}

function strength(c, n) {
  if (c === n) return 1;
  else if (c === 0) return 2;
  else if(Math.abs(c - n) === 2) return 4;
  else return 3;
}

// dp[i][j][k] => i번째 지시사항의 상태에서 발의 위치가 (j,k)일 때 최소힘
let dp = Array.from({length: arr.length}, () => Array.from({length: 5}, () => Array.from({length: 5}, () => 400001)));

dp[0][0][0] = 0;

for(let i=0; i<arr.length-1; i++) {
  let next = arr[i];
  for(let j=0; j<5; j++) {
    for(let k=0; k<5; k++) {
      let now = dp[i][j][k];

      if(next !== k) {
        dp[i+1][next][k] = Math.min(dp[i+1][next][k], now + strength(j, next));
      }

      if(next !== j) {
        dp[i+1][j][next] = Math.min(dp[i+1][j][next], now + strength(k, next));
      }
    }
  }
}

let min = 400001;
for(let i=0; i<5; i++) {
  for(let j=0; j<5; j++) {
    min = Math.min(min, dp[arr.length-1][i][j]);
  }
}
console.log(min);