const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9549.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();
let ans = [];

while (T--) {
  let enc = input[index++].trim();
  let ori = input[index++].trim();
  let dif = enc.length - ori.length;
  let oCnt = getCount(ori, 0, ori.length);

  let eCnt = getCount(enc, 0, ori.length);

  let found = false;
  for (let i = 0; i <= dif; i++) {
    if (compare(eCnt, oCnt)) {
      ans.push('YES');
      found = true;
      break;
    }
    if (i < dif) {
      eCnt[enc.charCodeAt(i) - 97]--;
      eCnt[enc.charCodeAt(i + ori.length) - 97]++;
    }
  }
  if (!found) ans.push('NO');
}

console.log(ans.join('\n'));

function getCount(str, start, length) {
  let alpha = Array.from({ length: 26 }, () => 0);
  for (let i = start; i < start + length; i++) {
    alpha[str.charCodeAt(i) - 97]++;
  }
  return alpha;
}

function compare(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
