const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2234.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const board = [];
const visited = Array.from({ length: M }, () => Array(N).fill(0));

for (let i = 0; i < M; i++) {
  board.push(input[index++].split(' ').map(Number));
}

// 1서, 2북, 4동, 8남
const dx = [0, -1, 0, 1];
const dy = [-1, 0, 1, 0];
const bit = [1, 2, 4, 8];
const rooms = [];

const bfs = (x, y, room) => {
  const queue = [[x, y]];
  visited[x][y] = room;
  let area = 1;
  let qIdx = 0;

  while (qIdx < queue.length) {
    const [curX, curY] = queue[qIdx++];

    for (let i = 0; i < 4; i++) {
      if ((board[curX][curY] & bit[i]) != 0) continue;
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
      if (visited[nx][ny] !== 0) continue;

      visited[nx][ny] = room;
      queue.push([nx, ny]);
      area++;
    }

    if (board[curX][curY] == 15) {
      visited[curX][curY] = room;
    }
  }

  rooms[room - 1] = area;
};

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] == 0) {
      bfs(i, j, rooms.length + 1);
    }
  }
}

// 맞닿는 부분
const encountered = Array.from({ length: rooms.length }, () =>
  Array(rooms.length).fill(false)
);

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    const room = visited[i][j] - 1;
    encountered[room][room] = true;

    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];

      if (nx < 0 || nx >= M || ny < 0 || ny >= N) continue;
      const sideRoom = visited[nx][ny] - 1;

      if (encountered[room][sideRoom]) continue;

      encountered[room][sideRoom] = true;
      encountered[sideRoom][room] = true;
    }
  }
}

let roomMax = 0;
let max = 0;
for (let i = 0; i < encountered.length; i++) {
  roomMax = Math.max(roomMax, rooms[i]);
  let count = 0;
  for (let j = 0; j < encountered[i].length; j++) {
    if (i !== j && encountered[i][j]) {
      count = rooms[i] + rooms[j];
      max = Math.max(max, count);
    }
  }
}

console.log(`${rooms.length}\n${roomMax}\n${max}`);
