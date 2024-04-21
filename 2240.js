const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2240.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [T, W] = input[index++].split(' ').map(Number);
let tree = [];
for (let i = 0; i < T; i++) {
  tree.push(Number(input[index++]));
}

const dp = Array.from(Array(T), () => Array(W).fill(0));

dp[0][0] = tree[0] === 1 ? 1 : 0;

// 가로 0번 채우기
for(let i=1; i<=W; i++) {
  if(i%2 === 1) {
    dp[0][i] = tree[0] === 2 ? dp[0][i-1] + 1 : dp[0][i-1];
  } else {
    dp[0][i] = tree[0] === 1 ? dp[0][i-1] + 1 : dp[0][i-1];
  }
}

// 새로 0번 채우기
for(let i=1; i<T; i++) {
  dp[i][0] = tree[i] === 1 ? dp[i-1][0] + 1 : dp[i-1][0];
}

for(let i=1; i<=W; i++) {

  for(let j=1; j<T; j++) {
    let temp = Math.max(dp[j-1][i], dp[j][i-1]);
    if(i % 2 === 1) {
      dp[j][i] = tree[j] === 2 ? temp + 1 : temp;
    } else {
      dp[j][i] = tree[j] === 1 ? temp + 1 : temp;
    }
  }
}

console.log(dp[T-1][W]);
print2DArray(dp);

function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(''));
  }
}