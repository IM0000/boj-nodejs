const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1987.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let index = 0;
const [R,C] = input[index++].split(' ').map(Number);

const map = Array(R);
for(let i=0; i<R; i++) {
  map[i] = input[index++].split('');
}

const visit = {};

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];
let max = 0;

function dfs(r, c, depth) {
  visit[map[r][c]] = true;
  max = Math.max(depth, max);

  for(let z=0; z<4; z++) {
    let nx = r + dx[z];
    let ny = c + dy[z];

    if(nx>=0 && nx<R && ny>=0 && ny<C) {
      if(!visit[map[nx][ny]]) {
        dfs(nx, ny, depth + 1);
        visit[map[nx][ny]] = false;
      }
    }
  }
}

dfs(0,0,1);
console.log(max);