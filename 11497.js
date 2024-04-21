const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11497.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++];

let answer = [];
while(T--) {
  let n = +input[index++];
  let arr = input[index++].split(' ').map(Number);
  arr.sort((a,b) => a-b);

  let even = arr.filter((_, i) => i % 2 === 0);
  let odd = arr.filter((_, i) => i % 2 === 1);
  odd.reverse();
  let tong = [...even, ...odd];

  let max = Math.abs(even[0]-odd[odd.length-1]);
  for(let i=0; i<tong.length-1; i++) {
    let diff = Math.abs(tong[i] - tong[i+1]);
    max = Math.max(max, diff);
  }
  answer.push(max);
}

console.log(answer.join('\n'));