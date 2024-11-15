const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2002.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const map = {};

for (let i = 1; i <= N; i++) {
  map[input[i].trim()] = i;
}

const arr = [];
for (let i = N + 1; i <= 2 * N; i++) {
  arr.push(map[input[i].trim()]);
}

let cnt = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = i; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      cnt++;
      break;
    }
  }
}
console.log(cnt);
