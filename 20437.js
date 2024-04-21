const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '20437.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++];

let answer = [];
while(T--) {
  let map = Array.from({length: 26}, ()=>[]);
  let str = input[index++];
  let K = +input[index++];
  let min = 10001;
  let max = -1;
  
  for(let i=0; i<str.length; i++) {
    map[str[i].charCodeAt() - 97].push(i);
  }

  for(let i=0; i<26; i++) {
    if(map[i].length < K) continue;
    for(let j=0; j<=map[i].length - K; j++) {
      let tmp = map[i][j + K - 1] - map[i][j] + 1;
      if(tmp < min) min = tmp;
      if(tmp > max) max = tmp;
    }
  }

  if(min == 10001 || max == -1) answer.push(-1);
  else answer.push(min + ' ' + max);
}

console.log(answer.join('\n'));