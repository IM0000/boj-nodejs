const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1094.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let target = +input[0].trim();
let stick = [64];

let sum = stick.reduce((prev, curr) => {
  return prev + curr;
}, 0);

while (target < sum) {
  let short = stick.pop();
  short /= 2;
  stick.push(short);
  sum = stick.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

  if (target > sum) {
    stick.push(short);
    sum = stick.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  }
}

console.log(stick.length);
