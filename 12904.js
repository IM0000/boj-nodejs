// A와 B
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '12904.txt';
let [s, t] = fs.readFileSync(filePath).toString().trim().split('\n');
let f = t.length - s.length;

while (f--) {
  if (t[t.length - 1] === 'A') {
    t = t.slice(0, -1);
  } else {
    t = t.slice(0, -1).split('').reverse().join('');
  }
}

if (t === s) {
  console.log(1);
} else {
  console.log(0);
}
