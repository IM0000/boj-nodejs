// // 기숙사 재배정 - 백트래킹 및 BigInt 적용
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '10978.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// let idx = 0;
// const T = parseInt(input[idx++], 10);
// const answer = [];

// for (let t = 0; t < T; t++) {
//   const N = parseInt(input[idx++], 10);
//   const memo = {};
//   const result = derangement(N, 0, 0, memo);
//   answer.push(result.toString()); // BigInt를 문자열로 변환하여 저장
// }

// /*
// N: 학생 수
// depth: 현재 배정할 학생의 인덱스
// used: 이미 사용된 기숙사를 비트마스크로 표현
// memo: 메모이제이션을 위한 객체
// */
// function derangement(N, depth, used, memo) {
//   if (depth === N) return 1n; // 모든 학생 배정 완료 (BigInt)
//   if (memo[used] !== undefined) {
//     return memo[used];
//   }

//   let count = 0n; // BigInt로 초기화
//   for (let i = 0; i < N; i++) {
//     if ((used & (1 << i)) === 0 && i !== depth) {
//       // 기숙사 i가 아직 사용되지 않았고, 학생 depth의 원래 기숙사가 아님
//       count += derangement(N, depth + 1, used | (1 << i), memo);
//     }
//   }
//   memo[used] = count;
//   return count;
// }

// console.log(answer.join('\n'));

// 기숙사 재배정 - 동적 프로그래밍(DP) 방식 with BigInt
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10978.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const T = parseInt(input[idx++], 10);
const answers = [];

// Derangement를 미리 계산하여 저장 (DP)
const MAX_N = 20;
const derangements = Array(MAX_N + 1).fill(0n); // BigInt 배열
derangements[0] = 1n; // D(0) = 1
if (MAX_N >= 1) derangements[1] = 0n; // D(1) = 0
for (let n = 2; n <= MAX_N; n++) {
  derangements[n] = BigInt(n - 1) * (derangements[n - 1] + derangements[n - 2]);
}

for (let t = 0; t < T; t++) {
  const N = parseInt(input[idx++], 10);
  answers.push(derangements[N].toString()); // BigInt를 문자열로 변환하여 저장
}

console.log(answers.join('\n'));
