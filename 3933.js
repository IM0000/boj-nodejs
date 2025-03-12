// 라그랑주의 네 제곱수 정리 - 정답풀이

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3933.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');
const testCases = input.slice(0, -1).map(Number);

// 문제에서 n은 최대 2^15 미만이므로 max를 2^15로 정함
const MAX = Math.pow(2, 15);

// dp[i][j] : i를 j개의 제곱수로 나타내는 경우의 수
// j는 0부터 4까지 사용 (0개 사용은 초기 조건을 위해)
const dp = Array.from({ length: MAX }, () => Array(5).fill(0));
dp[0][0] = 1;

// 사용할 제곱수 리스트 (1^2, 2^2, 3^2, ...)
// n의 최대값이 MAX-1 이므로, i가 MAX 미만인 제곱수를 구함
const squares = [];
for (let i = 1; i < MAX; i++) {
  let root = Math.sqrt(i);
  if (Number.isInteger(root)) {
    squares.push(i);
  }
}
// console.log('🚀 ~ file: 3933.js:19 ~ squares:', squares);

// dp 갱신: 동전 교환 문제와 동일한 방식(제곱수를 오름차순으로 선택)
// 제곱수를 외부 반복문으로 두어 순서를 고정함으로써 중복 조합을 방지합니다.
for (let sq of squares) {
  for (let count = 1; count <= 4; count++) {
    for (let sum = sq; sum < MAX; sum++) {
      dp[sum][count] += dp[sum - sq][count - 1];
      if (sq == 1 && dp[sum - sq][count - 1] == 1)
        console.log(
          '🚀 ~ file: 3933.js:33 ~ sum:',
          sum,
          count,
          sum - sq,
          count - 1,
          dp[sum - sq][count - 1]
        );
    }
  }
}

const answer = testCases.map((n) => {
  let ways = 0;
  for (let count = 1; count <= 4; count++) {
    ways += dp[n][count];
  }
  return ways;
});

console.log(answer.join('\n'));
