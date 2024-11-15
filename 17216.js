// 가장 큰 감소 부분 수열
const fs = require('fs');
const input = fs.readFileSync('17216.txt').toString().trim().split('\n');
const N = parseInt(input[0]);
const A = input[1].split(' ').map(Number);

// dp 배열 초기화 - dp[i] : i번째 인덱스를 마지막으로 하는 감소하는 부분수열 중 최대 합
const dp = [...A]; // 각 원소의 초기값을 자신으로 설정

// dp 계산
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (A[j] > A[i]) {
      dp[i] = Math.max(dp[i], dp[j] + A[i]);
    }
  }
}

// 결과 출력
console.log(Math.max(...dp));
