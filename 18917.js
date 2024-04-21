const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '18917.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const M = Number(input[index++].trim());
let arr = [];
let answer = [];
let sum = 0; 
let xor = 0;
function execute(method, num) {
  switch(method) {
    case 1:
      sum += num;
      xor ^= num
      break;
    case 2:
      sum -= num;
      xor ^= num;
      break;
    case 3:
      answer.push(sum);
      break;
    case 4:
      answer.push(xor);
      break;
    default: 
      break;
  }
}

for(let i=0; i<M; i++) {
  let [m,n] = input[index++].split(' ').map(Number);
  execute(m,n);
}
console.log(answer.join('\n'));