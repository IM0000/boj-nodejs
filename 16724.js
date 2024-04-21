const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16724.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);
const map = [];
for(let i = 0; i < N; i++){
  map.push(input[index++].split(''));
}
const dx = [-1,1,0,0];
const dy = [0,0,-1,1];
const visited = Array.from({length:N}, ()=>Array(M).fill(0));

let answer = 0;
for(let i = 0; i < N; i++){
  for(let j = 0; j < M; j++){
    if(visited[i][j]) continue;
    dfs(i,j);
  }
}

console.log(answer);

function dfs(x,y) {
  visited[x][y] = 1;
  const [nx, ny] = next(x, y);
  if(visited[nx][ny] == 0) dfs(nx,ny);
  else if(visited[nx][ny] == 1) answer += 1;
  visited[x][y] = 2; 
}

function next(x,y) {
  let d = map[x][y];
  if(d === 'U') d = 0;
  else if(d === 'D') d = 1;
  else if(d === 'L') d = 2;
  else if(d === 'R') d = 3;
  return [x + dx[d], y + dy[d]];
}