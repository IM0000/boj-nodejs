// PPAP
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16120.txt';
const input = fs.readFileSync(filePath).toString().trim().split('');
const stack = [];
let flag = true;
for (let i = 0; i < input.length; i++) {
  if (input[i] === 'P') {
    stack.push(input[i]);
    continue;
  }

  if (i + 1 > input.length) {
    flag = false;
    break;
  }

  if (input[i + 1] !== 'P') {
    flag = false;
    break;
  }

  if (stack.length === 0 || stack.pop() !== 'P') {
    flag = false;
    break;
  }

  if (stack.length === 0 || stack.pop() !== 'P') {
    flag = false;
    break;
  }
}

if (!flag || stack.length !== 1) {
  console.log('NP');
} else {
  console.log('PPAP');
}
