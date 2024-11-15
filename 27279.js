const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '27279.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const aArr = input[1].split(' ').map(Number);
const bArr = input[2].split(' ').map(Number);

let answer = 'NO';

if (aArr.indexOf(M) == -1) {
  console.log(answer);
  process.exit(0);
}

let variable = M;
aArr.sort((a, b) => b - a);
bArr.sort((a, b) => b - a);
let aIdx = -1;
for (let i = 0; i < bArr.length; i++) {
  let b = bArr[i];
  if (aIdx + b < aArr.length && aArr[aIdx + b] >= variable) {
    aIdx = aIdx + b;
    variable--;
    if (i == bArr.length - 1) {
      answer = 'YES';
    }
  } else {
    break;
  }
}

console.log(answer);
