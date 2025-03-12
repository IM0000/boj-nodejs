// // Summer Trip
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '17595.txt';
// const S = fs.readFileSync(filePath).toString().trim();

// let start = 0;
// let end = 0;
// let answer = 0;

// for (let i = 0; i < S.length; i++) {
//   let freq = {};
//   let lastPosition = {};
//   start = i;
//   end = i;
//   freq[S[start]] = 1;
//   lastPosition[S[start]] = start;

//   while (end < S.length - 1) {
//     end++;
//     freq[S[end]] = (freq[S[end]] || 0) + 1;
//     lastPosition[S[end]] = end;

//     if (S[start] === S[end]) {
//       break;
//     }

//     if (S[start] !== S[end] && freq[S[start]] === 1 && freq[S[end]] === 1) {
//       answer++;
//     }
//   }
// }
// console.log(answer);
// Summer Trip - 최적화된 Node.js 코드
const fs = require('fs');

// 입력 처리
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17595.txt';
const S = fs.readFileSync(filePath).toString().trim();

// 알파벳 'a'부터 'z'까지의 마지막 등장 위치를 저장하는 배열 초기화
const last_occurrence = Array(26).fill(-1);
let result = 0;

// 문자열을 순회
for (let j = 0; j < S.length; j++) {
  const c = S[j];
  const idx_c = c.charCodeAt(0) - 97; // 'a' -> 0, 'b' -> 1, ..., 'z' ->25
  const last_c = last_occurrence[idx_c];

  let count = 0;

  // 모든 다른 문자에 대해 마지막 등장 위치가 last_c보다 큰지 확인
  for (let idx_a = 0; idx_a < 26; idx_a++) {
    if (idx_a === idx_c) continue; // 같은 문자는 제외

    if (last_occurrence[idx_a] > last_c) {
      count++;
    }
  }

  // 유효한 좋은 일정의 수를 누적
  result += count;

  // 현재 문자의 마지막 등장 위치를 업데이트
  last_occurrence[idx_c] = j;
}

// 결과 출력
console.log(result);
