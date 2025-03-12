// 롤러코스터 타기
const fs = require('fs');
const readline = require('readline');

function main(input) {
  let index = 0;
  const N = parseInt(input[index++]);
  const rides = [];
  for (let i = 0; i < N; i++) {
    const [aiStr, biStr, tiStr] = input[index++].split(' ');
    const ai = parseInt(aiStr);
    const bi = parseInt(biStr);
    const ti = parseInt(tiStr);
    rides.push({ ai, bi, ti });
  }

  const Q = parseInt(input[index++]);
  const Ti = [];
  let maxTi = 0;
  for (let i = 0; i < Q; i++) {
    const t = parseInt(input[index++]);
    Ti.push(t);
    if (t > maxTi) maxTi = t;
  }

  const dp = new Array(maxTi + 1).fill(0);

  for (const ride of rides) {
    const { ai, bi, ti } = ride;
    if (bi === 0) {
      // 재미가 감소하지 않는 경우 (bi = 0): 무제한 배낭 문제
      for (let t = ti; t <= maxTi; t++) {
        dp[t] = Math.max(dp[t], dp[t - ti] + ai);
      }
    } else {
      // 재미가 감소하는 경우 (bi > 0): 각 횟수마다 아이템으로 처리
      const Mi = Math.floor(1 + Math.sqrt(ai / bi));
      const funValues = [];
      for (let k = 1; k <= Mi; k++) {
        const fun = ai - (k - 1) ** 2 * bi;
        if (fun <= 0) break;
        funValues.push(fun);
      }
      // 각 재미 값을 아이템으로 처리하여 0-1 배낭 문제 적용
      for (const fun of funValues) {
        for (let t = maxTi; t >= ti; t--) {
          dp[t] = Math.max(dp[t], dp[t - ti] + fun);
        }
      }
    }
  }

  // 각 질의에 대한 결과 출력
  for (const t of Ti) {
    console.log(dp[t]);
  }
}

const txt = fs.createReadStream(
  process.platform === 'linux' ? '/dev/stdin' : '3958.txt'
);
const rl = readline.createInterface(txt);

const inputLines = [];

rl.on('line', function (line) {
  inputLines.push(line.trim());
});

rl.on('close', function () {
  main(inputLines);
});
