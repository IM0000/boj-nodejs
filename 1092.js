const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1092.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];
const crane = input[index++].split(' ').map(Number);
crane.sort((a, b) => b - a);
const M = +input[index++];
const box = input[index++].split(' ').map(Number);
box.sort((a, b) => b - a);

if(crane[0] < box[0]) {
  console.log(-1);
  process.exit();
}

let answer = 0;
while(box.length > 0) {
  let craneIdx = 0;
  let boxIdx = 0;
  while(craneIdx < crane.length && boxIdx < box.length) {
    if(crane[craneIdx] >= box[boxIdx]) {
      craneIdx++;
      box.splice(boxIdx, 1);
    } else {
      boxIdx++;
    }
  }
  answer++;
}
console.log(answer);
