const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2212.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const K = +input[index++].trim();
const arr = input[index++].trim().split(' ').map(Number);
arr.sort((a, b) => a - b);

let L = K - 1;
const diff = [];
for(let i=0; i<N-1; i++) {
  diff.push(arr[i+1] - arr[i]);
}
diff.sort((a, b) => a - b);
let answer = 0;
for(let i=0; i<diff.length-L; i++) {
  answer += diff[i];
}
console.log(answer);