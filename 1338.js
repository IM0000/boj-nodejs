const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1338.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [a, b] = input[0].split(' ').map(Number);
let [x, y] = input[1].split(' ').map(Number);

if (a > b) {
  let tmp = a;
  a = b;
  b = tmp;
}

if (Math.abs(x) <= y || y < 0) {
  console.log('Unknwon Number');
  process.exit(0);
}

let ans = '';

x = Math.abs(x);
let val = x * Math.floor(a / x) + y;
if (val >= a && val <= b) {
  while (val <= b) {
    if (val <= b) {
      if (ans !== '') {
        ans = 'Unknwon Number';
        break;
      } else {
        ans = val;
      }
    }
    val += x;
  }
} else {
  ans = 'Unknwon Number';
}

console.log(ans);
