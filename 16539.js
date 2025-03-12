// chain
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16539.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input[1].trim().split(' ').map(Number);
const stack = [];
const answer = Array(n).fill(0);
for (let i = arr.length - 1; i >= 0; i--) {
  while (stack[stack.length - 1] && stack[stack.length - 1] <= arr[i]) {
    stack.pop();
  }
  stack.push(arr[i]);
  answer[i] = stack.length - 1;
}

console.log(answer.join(' '));
