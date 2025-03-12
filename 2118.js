const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2118.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const arr = input.slice(1).map(Number);

// 전체 둘레 T 계산
const total = arr.reduce((sum, cur) => sum + cur, 0);

// 누적합 배열 (원형 처리를 위해 배열을 두 배로)
const prefix = Array(2 * n + 1).fill(0);
for (let i = 0; i < 2 * n; i++) {
  prefix[i + 1] = prefix[i] + arr[i % n];
}

let answer = 0;
let j = 0;

// i를 시작점으로 두고, j를 늘려 가면서 구간 합을 T/2 이하로 유지
for (let i = 0; i < n; i++) {
  // j가 i+n까지 진행 가능 (원형)
  while (j < i + n && prefix[j + 1] - prefix[i] <= total / 2) {
    j++;
  }
  // 두 후보: 현재 j와 j - 1
  let d1 = prefix[j] - prefix[i];
  let candidate1 = Math.min(d1, total - d1);
  answer = Math.max(answer, candidate1);

  if (j - 1 >= i) {
    let d2 = prefix[j - 1] - prefix[i];
    let candidate2 = Math.min(d2, total - d2);
    answer = Math.max(answer, candidate2);
  }
}

console.log(answer);
