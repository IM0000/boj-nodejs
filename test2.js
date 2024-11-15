const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
let T = +input[0].trim();
let index = 1;
let answer = [];
while (T--) {
  let [a, b] = input[index++].trim().split(' ').map(Number);
  let last = a % 10;
  let arr;
  if (last == 1) {
    answer.push(1);
    continue;
  } else if (last == 2) {
    arr = [2, 4, 8, 6];
  } else if (last == 3) {
    arr = [3, 9, 7, 1];
  } else if (last == 4) {
    arr = [4, 6];
  } else if (last == 5) {
    answer.push(5);
    continue;
  } else if (last == 6) {
    answer.push(6);
    continue;
  } else if (last == 7) {
    arr = [7, 9, 3, 1];
  } else if (last == 8) {
    arr = [8, 4, 2, 6];
  } else if (last == 9) {
    arr = [9, 1];
  } else {
    answer.push(10);
    continue;
  }
  let idx = (b - 1) % arr.length;
  answer.push(arr[idx]);
}
console.log(answer.join('\n'));
