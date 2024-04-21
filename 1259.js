const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1259.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

for(let i=0; i<input.length; i++){
  if(input[i] === '0') break;
  let reverse = input[i].split('').reverse().join('');
  if(input[i] === reverse) console.log('yes');
  else console.log('no');
}