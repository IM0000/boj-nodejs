// 램프
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1034.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const countMap = {};
for (let i = 0; i < n; i++) {
  const lamp = input[idx++].trim();
  countMap[lamp] = (countMap[lamp] || 0) + 1;
}
// console.log('🚀 ~ file: 1034.js:11 ~ countMap:', countMap);
const cc = []; // [0의 갯수, 문자열 갯수]
for (let key in countMap) {
  let count = 0;
  for (let i = 0; i < m; i++) {
    if (key[i] === '0') count++;
  }
  cc.push([count, countMap[key]]);
}
cc.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }
  return b[1] - a[1];
});
// console.log('🚀 ~ file: 1034.js:20 ~ cc:', cc);

let k = +input[idx++].trim();
let answer = 0;
for (let i = 0; i < cc.length; i++) {
  if (k < cc[i][0]) {
    continue;
  } else {
    if ((k - cc[i][0]) % 2 == 0) {
      answer = Math.max(answer, cc[i][1]);
    }
  }
}
console.log(answer);
