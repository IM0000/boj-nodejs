const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14500.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);
const map = Array(N);
const visited = Array.from(Array(N), ()=>Array(M).fill(false));

for(let i=0; i<N; i++) {
  map[i] = input[index++].split(' ').map(Number);
}

let max = 0;

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];

// ㅜ ㅗ ㅏ ㅓ
const edx = [[0,0,0,1], [0,0,0,-1], [0,1,2,1], [0,1,2,1]];
const edy = [[0,1,2,1], [0,1,2,1],  [0,0,0,1], [0,0,0,-1]];


for(let i=0; i<N; i++) {
  for(let j=0; j<M; j++) {
    // 1. 길이가 4인 dfs
    visited[i][j] = true;
    dfs(i, j, map[i][j], 1);
    visited[i][j] = false;

    // 2. ㅜ 모양 체크
    checkShape(i, j);
  }
}

console.log(max);


function dfs(x, y, sum, length) {
  if(length === 4) {
    max = Math.max(max, sum);
    return;
  }

  for(let i=0; i<4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if(nx<0 || nx>=N || ny<0 || ny>=M) continue;

    if(!visited[nx][ny]) {
      visited[nx][ny] = true;

      dfs(nx, ny, sum + map[nx][ny], length + 1);

      visited[nx][ny] = false;
    }
  }
}


function checkShape(x, y) {
  for(let i=0; i<4; i++) {
    let sum = 0;
    
    for(let j=0; j<4; j++) {
      const nx = x + edx[i][j];
      const ny = y + edy[i][j];

      if(nx<0 || nx>=N || ny<0 || ny>=M) break;

      sum += map[nx][ny];
      
      if(j === 3) {
        max = Math.max(max, sum);
      }
    }
  }
}