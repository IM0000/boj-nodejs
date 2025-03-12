// 규칙적인 보스돌이
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '29792.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, k] = input[0].split(' ').map(Number);
const damages = input.slice(1, n + 1).map((i) => +i);
const boss = input.slice(n + 1).map((i) => i.split(' ').map(Number));

const selectedDamages = damages.sort((a, b) => b - a).slice(0, m);

let answer = 0;
// dp[k번째 보스][사용한시간] = 획득한 골드
for (let c = 0; c < selectedDamages.length; c++) {
  const dp = Array.from({ length: k + 1 }, () => Array(901).fill(0));
  let damage = selectedDamages[c];
  for (let i = 1; i <= k; i++) {
    let [hp, gold] = boss[i - 1];
    let needTime = Math.ceil(hp / damage);
    for (let j = 1; j <= 900; j++) {
      if (j >= needTime) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - needTime] + gold);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  answer += dp[k][900];
}

console.log(answer);
