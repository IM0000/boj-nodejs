const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14719.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const arr = input[index++].split(' ').map(Number);
let sum = 0;

for (let i=1; i<M-1; i++) {
  let left = 0;
  let right = 0;

  for(let j=i-1; j>=0; j--) {
    left = Math.max(left, arr[j]);
  }

  for(let j=i+1; j<M; j++) {
    right = Math.max(right, arr[j]);
  }

  sum += Math.max(0, (Math.min(left, right) - arr[i]));
}

console.log(sum);