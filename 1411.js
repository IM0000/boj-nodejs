const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1411.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const n = +input[idx++].trim();

const cArr = {};
for (let i = 0; i < n; i++) {
  let s = input[idx++].trim();
  let c = '';
  let map = {};
  for (let j = 0; j < s.length; j++) {
    if (map[s[j]] === undefined) {
      map[s[j]] = j;
    }
    c += map[s[j]];
  }
  cArr[c] = (cArr[c] || 0) + 1;
}

let answer = 0;
for (let key in cArr) {
  answer += (cArr[key] * (cArr[key] - 1)) / 2;
}

console.log(answer);
