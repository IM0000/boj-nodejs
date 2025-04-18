// -2진수
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2089.txt';
const n = Number(fs.readFileSync(filePath).toString().trim());
let temp = n;
let answer = [];
while (temp / -2 !== 0) {
  let r = temp % -2;
  if (r === 1 || r === -1) {
    temp = Math.floor(temp / -2) + 1;
    answer.push(1);
  } else {
    temp = Math.floor(temp / -2);
    answer.push(0);
  }
}
console.log(n === 0 ? 0 : answer.reverse().join(''));
