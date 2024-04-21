const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = +fs.readFileSync(filePath).toString().trim();

let n = input/4;
let answer = 'int';
for(let i = 0; i < n; i++){
  answer = 'long ' + answer;
}
console.log(answer);