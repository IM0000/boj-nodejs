const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1032.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const arr = input;

let answer = '';
let first = arr[0];

for(let i=0; i<first.length; i++){
  let isEq = true;
  for(let j=1; j<arr.length; j++){
    if(arr[j].charAt(i) == first.charAt(i)) {
      continue;
    } else {
      isEq = false;
    }
  }

  if(isEq) answer += first.charAt(i);
  else answer += '?';

}

console.log(answer);
