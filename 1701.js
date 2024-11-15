const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1701.txt';
const input = fs.readFileSync(filePath).toString().trim();

let max = 0;
for (let i = 0; i < input.length; i++) {
  let pattern = input.slice(i);
  let lps = computeLPSArray(pattern);
  let temp = Math.max(...lps);
  if (max < temp) {
    max = temp;
  }
}
console.log(max);

function computeLPSArray(pattern) {
  let tot = pattern.length;
  let lps = new Array(tot).fill(0); // lps[0] = 0; -> 부분문자열 길이가 1일때 일치하는 길이(접두사/접미사)는 0
  let len = 0; // 일치하는 길이
  let i = 1; // 패턴이 이동한 거리?

  // 이동한거리 < 전체 길이
  while (i < tot) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len === 0) {
        lps[i] = 0;
        i++;
      } else {
        len = lps[len - 1];
      }
    }
  }

  return lps;
}
