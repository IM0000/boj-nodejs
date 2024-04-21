const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '27172.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const arr = input[1].split(' ').map(Number);

const visit = Array(1000001).fill(false);
const score = Array(1000001).fill(0);
let max = 0;

for(let i=0; i<n; i++) {
  let tmp = arr[i];
  visit[tmp] = true;
  if(max < tmp) max = tmp;
}

for(let i=1; i<=max; i++) {
  if(visit[i]) {
    let n = 2;
    let add = 0;
    while(i*n <= max) {
      if(visit[i*n]) {
        score[i*n]--;
        add++
      }
      n++;
    }
    score[i] += add;
  }
}

let ans = [];
for(let i=0; i<arr.length; i++) {
  ans.push(score[arr[i]]);
}

console.log(ans.join(' '));