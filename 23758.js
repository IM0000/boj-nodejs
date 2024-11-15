// 중앙값 제거
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23758.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0].trim();
const arr = input[1].trim().split(' ').map(Number);

arr.sort((a, b) => a - b);
let mid = Math.floor((n + 1) / 2);
let cnt = 0;

for (let i = 0; i < mid; i++) {
  cnt += Math.floor(Math.log2(arr[i]));
}

console.log(cnt + 1);

// 7 3 9 5

// 7 3 9 2
// 7 1 9 2
// 7 1 9 1
// 7 0 9 1

// 5 > 3 > 2 > 1 > 0

// 2021 1127 1400

// 2021 1127 700
// 2021 563 700
// 2021 563 350
// 2021 281 350
// 2021 281 175
// 2021 140 175
// 2021 140 87
// 2021 70 87
// 2021 70 43
// 2021 35 43
// 2021 35 21
// 2021 18 21
// 2021 18 10
// 2021 9 10
// 2021 9 5
// 2021 4 5
// 2021 4 2
// 2021 2 2
// 2021 1 2
// 2021 1 1
// 2021 0 1

// log(갯수)
// 10 /2 = 5
// 5 / 2 = 2
// 2 / 2 = 1

// 10, 5, 3, 2
// 2번 + 1
// 1 2 3 4 5 6 7 8 9 10

// 1 2 3 4 2 6 7 8 9 10
// 1 2 3 2 2 6 7 8 9 10
// 1 2 1 2 2 6 7 8 9 10
// 1 1 1 2 2 6 7 8 9 10
// 1 1 0 2 2 6 7 8 9 10
