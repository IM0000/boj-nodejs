const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23971.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

const [h,w,n,m] = input[0].trim().split(' ').map(Number);

let cnt = 0;
for(let i=0; i<h; i=i+n+1) {
  for(let j=0; j<w; j=j+m+1) {
    cnt++;
  }
}

console.log(cnt);