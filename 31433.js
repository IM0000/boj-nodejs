const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31433.txt';
const input = fs.readFileSync(filePath).toString().trim();

let X = input;
let answer = 10000000;
const KSA = ['K', 'S', 'A'];

function calc(str, cnt) {
  let idx = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === KSA[idx % 3]) {
      ++idx;
    } else {
      ++cnt; // 제거
    }
  }
  cnt += Math.abs(idx - X.length);
  answer = Math.min(answer, cnt);
}

calc(X, 0);
calc('K' + X, 1);
calc('KS' + X, 2);

console.log(answer);
