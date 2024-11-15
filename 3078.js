const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3078.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input.shift().split(' ').map(Number);
const arr = input;
const size = K + 1;
const map = new Map();

let answer = 0;
for (let i = 0; i < size; i++) {
  let len = arr[i].length;
  map.set(len, map.get(len) ? map.get(len) + 1 : 1);
}
// 5 -> 4 3 2 1 = 10 => n*n-1/2

map.forEach((v) => {
  answer += (v * (v - 1)) / 2;
});

for (let i = size; i < N; i++) {
  let outLen = arr[i - size].length;
  map.set(outLen, map.get(outLen) - 1);
  let inLen = arr[i].length;
  answer += map.get(inLen) ? map.get(inLen) : 0;
  map.set(inLen, map.get(inLen) ? map.get(inLen) + 1 : 1);
}

console.log(answer);
