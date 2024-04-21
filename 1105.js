const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1105.txt';
const [l,r] = fs.readFileSync(filePath).toString().trim().split(' ');

let answer = 0;
if(l.length === r.length) {
  for(let i=0; i<l.length; i++) {
    if(l.charAt(i) == r.charAt(i)){
      if(l.charAt(i) == '8') answer++;
    } else {
      break;
    }
  }
}

console.log(answer);

let a = '8888';
88008808
88048899