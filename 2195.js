// 문자열 복사
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2195.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [s, p] = input;

let cur = 0;
let cnt = 0;
for (let i = 0; i < p.length; i++) {
  for (let j = i + 1; j <= p.length; j++) {
    let str = p.substring(i, j);

    if (s.indexOf(str) == -1) {
      cnt++;
      break;
    }
    cur = j;
  }
  i = cur - 1;
}
console.log(cnt + 1);
