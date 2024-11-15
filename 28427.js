// Tricknology
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '28427.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const Q = +input[0].trim();
const sieve = Array(1000001).fill(true);
for (let i = 0; i * i <= 1000000; i++) {
  if (i < 2) {
    sieve[i] = false;
    continue;
  }
  if (sieve[i]) {
    for (let j = i * i; j < sieve.length; j += i) {
      sieve[j] = false;
    }
  }
}

const dp = Array(500001).fill(0);
for (let i = 2; i <= 500000; i++) {
  if (sieve[i * 2 + 1]) {
    dp[i] = 1;
  }
}

const ddp = Array(500001).fill(0);
for (let i = 2; i <= 500000; i++) {
  ddp[i] = ddp[i - 1] + dp[i];
}

const answer = [];
for (let i = 1; i <= Q; i++) {
  const [s, e] = input[i].split(' ').map(Number);

  answer.push(ddp[e - 1] - ddp[s - 1]);
}

console.log(answer.join('\n'));

// 7 12  12-7 = 5    3
// 7 8 9 10 11 12
// total 15 ~ 23 : 9
// 15 ~ 19
// 17 ~ 20
// 19 ~ 21
// 21 ~ 22
// 23 ~ 23
// 15 16 17 18 19 20 21 22 23
//  1  1  2  2  3  3  2  2  1

// 2 ~ 4
// 2 3 4
// 5 ~ 6
// 7 ~ 7
// 5 6 7
// 1 1 1

// 9 ~ 21  21-9 = 12    6
// total 19 ~ 41 : 23
// 19 ~ 30
// 21 ~ 31
// 23 ~ 32
// 25 ~ 33
// 27 ~ 34
// 29 ~ 35
// 31 ~ 36
// 33 ~ 37
// 35 ~ 38
// 37 ~ 39
// 39 ~ 40
// 41 ~ 41

// 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41
//  1  1  2  2  3  3  4  4  5  5  6  6  6  5  5  4  4  3  3  2  2  1  1
