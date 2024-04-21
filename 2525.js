const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2525.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const time = input[0].split(' ').map(Number);
const c = Number(input[1]);

let [h, m] = time;
m += c;
if (m >= 60) {
  h += Math.floor(m / 60);
  m %= 60;
}
if (h >= 24) h %= 24;
console.log(`${h} ${m}`);