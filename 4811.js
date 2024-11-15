const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4811.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const dp = Array.from(Array(31), () => Array(31).fill(0));

// (sol 1)
// W,H로 이루어진 문자열을 만드는 경우의 수
// for (let h = 0; h <= 30; h++) {
//   for (let w = 0; w <= 30; w++) {
//     if (h > w) {
//       continue;
//     }
//     if (h === 0) {
//       dp[w][h] = 1;
//       continue;
//     }
//     dp[w][h] = dp[w - 1][h] + dp[w][h - 1];
//   }
// }

// const ans = [];
// for (let i = 0; i < input.length - 1; i++) {
//   const N = +input[i].trim();
//   ans.push(dp[N][N]);
// }
// console.log(ans.join('\n'));

// (sol 2)
// dp[w][h] => 온전한 w개, 반쪽 h개가 병에 있을 때 꺼내는 경우의 수
// dp[0][h] = 1, 반쪽짜리만 있는 경우
// dp[w][h] = dp[w-1][h+1] + dp[w][h-1] : 0<=w<=30, 0<=h<=w-1

for (let i = 1; i <= 30; i++) {
  dp[0][i] = 1;
}

for (let w = 1; w <= 30; w++) {
  for (let h = 0; h <= 30; h++) {
    if (h == 0) {
      dp[w][h] = dp[w - 1][h + 1];
    } else {
      dp[w][h] = dp[w - 1][h + 1] + dp[w][h - 1];
    }
  }
}

const ans = [];
for (let i = 0; i < input.length - 1; i++) {
  const N = +input[i].trim();
  ans.push(dp[N][0]);
}
console.log(ans.join('\n'));
