const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2302.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++].trim();
let M = +input[index++].trim();
let vip = [];

for(let i=0; i<M; i++) {
  vip.push(+input[index++].trim());
}

let fibo = [1,1];
for(let i=2; i<=N; i++) {
  fibo[i] = fibo[i-1] + fibo[i-2];
}

let cur = 1;
let answer = 1;
for(let i=0; i<vip.length; i++) {
  answer *= fibo[vip[i] - cur];
  cur = vip[i] + 1;
}

answer *= fibo[N - cur + 1];

console.log(answer);