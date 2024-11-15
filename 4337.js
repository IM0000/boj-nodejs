// Ferry Loading II
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4337.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let T = +input[0].trim();
const answer = [];
let index = 1;
while (T-- > 0) {
  // n: 페리 용량, t: 강 건너는 시간, m: 총 자동차 수
  const [n, t, m] = input[index++].trim().split(' ').map(Number);
  const a = [];
  for (let i = 0; i < m; i++) {
    a.push(+input[index++].trim());
  }
  const maxRound = Math.ceil(m / n);

  const min = m % n;
  const dp = Array.from({ length: maxRound + 1 }, () =>
    Array(m + 1).fill(Infinity)
  );

  for (let i = 1; i <= maxRound; i++) {
    if (i == 1) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[j - 1] + 2 * t;
      }
      continue;
    }

    for (let j = min + 1; j <= m; j++) {
      for (let k = 1; k <= n; k++) {
        if (j - k <= 0 || j - k > m) continue;
        dp[i][j] = Math.min(
          dp[i][j],
          Math.max(dp[i - 1][j - k], a[j - 1]) + 2 * t
        );
      }
    }
  }
  answer.push(`${dp[maxRound][m] - t} ${maxRound}`);
}
console.log(answer.join('\n'));

// 최소 도착시간, 최소 여행횟수
// dp[회차][총옮긴대수] = 다시 선착장으로 되돌아온 최소시간
// dp[1][0] = 0
// dp[1][1] = a[0] + 2t
// dp[1][2] = a[1] + 2t
// dp[1][3] = a[2] + 2t
// dp[1][4] = a[3] + 2t
// dp[2][5] = Math.max(dp[1][4], a[4]) + 2t
//            Math.max(dp[1][3], a[4]) + 2t
//            Math.max(dp[1][2], a[4]) + 2t
//            Math.max(dp[1][1], a[4]) + 2t
// dp[3][10] - t
// dp[i][j] = dp[i-1][j-(1~n)]

// dp[m/n][m]
