const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1013.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let T = Number(input.shift());
// (100+1+ | 01)+
let ans = [];
while(T--) {
  let str = input.shift();
  let regex = /^(100+1+|01)+$/;

  if(regex.test(str)) ans.push('YES');
  else ans.push('NO');
}

console.log(ans.join('\n'));