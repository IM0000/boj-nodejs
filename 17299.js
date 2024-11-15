const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17299.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const count = {};
const arr = input[0].split(' ').map(Number);
const result = Array(N).fill(-1);

for (let i = 0; i < N; i++) {
  if (count[arr[i]] === undefined) {
    count[arr[i]] = 1;
  } else {
    count[arr[i]]++;
  }
}

let stack = [];

for (let i = 0; i < N; i++) {
  while (stack.length && count[arr[stack[stack.length - 1]]] < count[arr[i]]) {
    result[stack.pop()] = arr[i];
  }
  stack.push(i);
}
console.log(result.join(' '));
