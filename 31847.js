const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31847.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const S = input[index++].trim();
const Q = +input[index++].trim();

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
const sdp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let gap = 1; gap < N; gap++) {
  for (let j = 1; j + gap <= N; j++) {
    let x = j;
    let y = j + gap;

    if (gap === 1) {
      dp[x][y] = S[j - 1] === S[j + gap - 1] ? 1 : 0;
      sdp[x][y] = dp[x][y];
      continue;
    }

    if (gap % 2 === 0) {
      // 길이가 홀수
      dp[x][y] = Math.max(dp[x][y - 1], dp[x + 1][y]);
    }

    if (gap % 2 === 1) {
      // 길이가 짝수
      sdp[x][y] = sdp[x + 1][y - 1] + (S[j - 1] == S[j + gap - 1] ? 1 : 0);
      dp[x][y] = Math.max(dp[x][y - 1], dp[x + 1][y], sdp[x][y]);
    }
  }
}

let answer = '';
for (let i = 0; i < Q; i++) {
  let [l, r] = input[index++].trim().split(' ').map(Number);
  answer += dp[l][r] + '\n';
}
console.log(answer.trim());

function print2DArrayAsPlane(arr) {
  let height = arr.length;
  let width = arr[0].length;

  // 2차원 배열을 평면에 출력
  for (let y = 0 + 1; y < height; y++) {
    let row = '';
    for (let x = 0 + 1; x < width; x++) {
      row += arr[y][x] + ' ';
    }
    console.log(row);
  }
}
