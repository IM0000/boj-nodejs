const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2667.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift().trim());
const map = Array(N).fill(0).map(()=>input.shift().split('').map(Number));
const visit = Array(N).fill(0).map(()=>Array(N).fill(false));

let dangi = 0;
const countList = [];

for(let i=0; i<N; i++) {
  for(let j=0; j<N; j++) {
    if(map[i][j] === 1 && !visit[i][j]) {
      dangi += 1; // 단지 수 증가
      countList.push(bfs(i,j)); // bfs 실행마다 집의 수 넣기
    }
  }
}

let ans = dangi;
countList.sort((a,b) => a-b).forEach(e => ans += '\n' + e);
console.log(ans);

function bfs(x,y) {
  const dx = [0,0,-1,1];
  const dy = [-1,1,0,0];
  const queue = [];
  visit[x][y] = true;
  queue.push({x:x,y:y});
  let count = 1;

  while(queue.length !== 0) {
    const {x,y} = queue.shift();

    for(let z=0; z<4; z++) {
      const nx = x + dx[z];
      const ny = y + dy[z];

      if(nx<0 || nx>=N || ny<0 || ny>=N) continue;
      if(!visit[nx][ny] && map[nx][ny] === 1) {
        visit[nx][ny] = true;
        queue.push({x:nx,y:ny});
        count += 1;
      }
    }
  }

  return count;
}
