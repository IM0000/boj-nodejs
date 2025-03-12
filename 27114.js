// 조교의 맹연습
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '27114.txt';
const [a, b, c, k] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

// 좌, 우, 뒤
const dd = [3, 1, 2];
const de = [a, b, c];

// dp[소비한에너지][방향] = 최소횟수
// 방향 0 == 처음방향
const dp = Array.from({ length: k + 1 }, () => Array(4).fill(Infinity));
dp[0][0] = 0;

for (let i = 0; i < dd.length; i++) {
  const energy = de[i];
  const dir = dd[i];

  for (let j = 0; j <= k; j++) {
    for (let d = 0; d < 4; d++) {
      let nextDir = (d + dir) % 4;
      let nextEnergy = j + energy;
      if (nextEnergy > k) continue;

      if (dp[j][d] !== Infinity) {
        dp[nextEnergy][nextDir] = Math.min(
          dp[nextEnergy][nextDir],
          dp[j][d] + 1
        );
      }
    }
  }
}

let answer = dp[k][0] === Infinity ? -1 : dp[k][0];

console.log(answer);
