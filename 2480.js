const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2480.txt';
const input = fs.readFileSync(filePath).toString().split(' ').map(Number);

let ans;
if(input[0] == input[1] && input[1] == input[2]) {
  ans = 10000 + input[0]*1000;
} else if(input[0] == input[1]) {
  ans = 1000 + input[0]*100;
} else if(input[1] == input[2]) {
  ans = 1000 + input[1]*100;
} else if(input[0] == input[2]) {
  ans = 1000 + input[0]*100;
}  else {
  let max = Math.max(...input);
  ans = max*100;
}

console.log(ans);