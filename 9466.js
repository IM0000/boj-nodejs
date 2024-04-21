const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9466.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();
let arr, cnt;
let answer = [];

while(T--) {
  let n = +input[index++].trim();
  arr = [-1, ...input[index++].split(' ').map(Number)];
  let visit = Array.from({length:n+1}, ()=>false);
  let complete = Array.from({length:n+1}, ()=>false)
  cnt = 0;

  for(let k=1; k<=n; k++) {
    if(visit[k]) continue;
    
    dfs(k, visit, complete);

  }

  answer.push(n - cnt);
  cnt = 0;
}

console.log(answer.join('\n'))

function dfs(x, v, c) {
  v[x] = true;
  let next = arr[x];

  if(!v[next]) dfs(next, v, c);
  else if(!c[next]) {
    for(let i = next; i != x; i = arr[i]) {
      cnt += 1;
    }
    cnt += 1;
  }

  c[x] = true;
}