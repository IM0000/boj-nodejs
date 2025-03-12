// 신아를 만나러
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '6146.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
let [x, y, n] = input[idx++].trim().split(' ').map(Number);
const board = Array.from({ length: 1001 }, () => Array(1001).fill(0));
for (let i = 0; i < n; i++) {
  const [a, b] = input[idx++].trim().split(' ').map(Number);
  board[a + 500][b + 500] = 1;
}

const queue = [];
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const visited = Array.from({ length: 1001 }, () => Array(1001).fill(0));
visited[500][500] = 1;
queue.push([500, 500, 0]);

while (queue.length !== 0) {
  const [cx, cy, cnt] = queue.shift();
  if (cx === x + 500 && cy === y + 500) {
    console.log(cnt);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];
    if (nx < 0 || nx > 1000 || ny < 0 || ny > 1000) continue;
    if (visited[nx][ny] === 1) continue;
    if (board[nx][ny] === 1) continue;
    visited[nx][ny] = 1;
    queue.push([nx, ny, cnt + 1]);
  }
}
