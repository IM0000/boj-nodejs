const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14936.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, m] = input[0].split(' ').map(Number);
let answer = 1;
let case1 = N;
let case2 = Math.floor(N / 2);
let case3 = N % 2 == 1 ? Math.floor((N + 1) / 2) : Math.floor(N / 2);
let case4 = Math.floor((N + 2) / 3);

if (N >= 1 && m >= case1) answer++;

if (N >= 2 && m >= case2) answer++;

if (N >= 2 && m >= case3) answer++;

if (N >= 3 && m >= case4) answer++;

if (N >= 3 && m >= case1 + case4) answer++;

if (N >= 3 && m >= case2 + case4) answer++;

if (N >= 3 && m >= case3 + case4) answer++;

console.log(answer);
