// 백신 개발
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30090.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const check = Array(N).fill(false);

let answer = 100;

bk(0, '');
console.log(answer);
// VIRUSTAND
function bk(n, str) {
  if (n === N && allCheck()) {
    answer = Math.min(answer, str.length);
  }

  for (let i = 0; i < N; i++) {
    if (!check[i]) {
      let tmp = str === '' ? input[i] : comb(str, input[i]);
      if (tmp === -1) {
        continue;
      }
      check[i] = true;
      bk(n + 1, tmp);
      check[i] = false;
    }
  }
}

function comb(s1, s2) {
  let maxOverlap = 0;

  for (let i = 1; i <= Math.min(s1.length, s2.length); i++) {
    if (s1.endsWith(s2.substring(0, i))) {
      maxOverlap = i;
    }
  }

  if (maxOverlap === 0) return -1;
  return s1 + s2.substring(maxOverlap);
}

function allCheck() {
  return check.every((value) => value === true);
}
