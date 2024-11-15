const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31529.txt';
const input = fs.readFileSync(filePath).toString().split(' ').map(Number);
const [X, Y] = input;

let answer;
if (X > Y || X + X - Y < 0) {
  answer = -1;
} else {
  answer = Math.floor(((X + X - Y) / 4) * 2024);
}

console.log(answer);
