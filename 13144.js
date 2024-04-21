const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '13144.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const arr = input[0].split(' ').map(Number);
let map = {};
let answer = 0;
let left = 0;
let right = 0;

while(left < N && right < N) {
  if(typeof map[arr[right]] == 'undefined') {
    map[arr[right]] = right;
    answer += right - left + 1;
    right++;
  } else {
    let check = map[arr[right]] + 1;
    if(left < check) left = check;
    answer += right - left + 1;
    map[arr[right]] = right;
    right++;
  }
}
console.log(answer);