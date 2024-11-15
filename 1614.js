const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1614.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const finger = +input[0];
const cnt = +input[1] + 1;

let ans = 0;
if (cnt == 0) {
  ans = finger - 1;
} else if (cnt == 1) {
  ans = finger;
} else {
  if (finger === 1 || finger === 5) {
    ans = 8 * (cnt - 1) + finger;
  } else {
    let r = cnt % 2;
    if (r == 1) {
      let q = Math.floor(cnt / 2);
      ans = 8 * q + finger;
    } else {
      let q = Math.floor(cnt / 2) - 1;
      ans = 8 * q + (10 - finger);
    }
  }
}
console.log(ans - 1);
