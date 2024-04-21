const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7562.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++];


const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
const dy = [1, 2, 2, 1, -1, -2, -2, -1];

const bfs = (N, x, y, ex, ey) => {
  let visited = Array.from(Array(N), () => Array(N).fill(false));
  const queue = [];
  visited[x][y] = true;
  queue.push([x, y, 0]);

  while(queue.length) {
    const [cx, cy, cnt] = queue.shift();
    if(cx === ex && cy === ey) return cnt;
    for(let i=0; i<8; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if(nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if(visited[nx][ny]) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny, cnt+1]);
    }
  }
}

let N;
let ans = [];
while(T--) {
  N = +input[index++].trim();
  let [x, y] = input[index++].trim().split(' ').map(Number);
  let [ex, ey] = input[index++].trim().split(' ').map(Number);
  ans.push(bfs(N, x, y, ex, ey));
}

console.log(ans.join('\n'));