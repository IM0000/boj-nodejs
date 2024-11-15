class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  push(data) {
    const node = new Node(data);
    if (this.size == 0) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
    this.size++;
  }

  pop() {
    if (this.size == 0) return null;
    const removedData = this.front.data;

    if (this.front == this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return removedData;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16973.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;

const [N, M] = input[index++].split(' ').map(Number);

const board = [];
for (let i = 0; i < N; i++) {
  board.push(input[index++].split(' ').map(Number));
}

const [H, W, sn, sm, fn, fm] = input[index++].split(' ').map(Number);

const visited = Array.from({ length: N }, () => Array(M).fill(false));
const queue = new Queue();
queue.push([sn - 1, sm - 1, 0]);
visited[sn - 1][sm - 1] = true;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

while (queue.size != 0) {
  const [cx, cy, move] = queue.pop();

  if (cx == fn - 1 && cy == fm - 1) {
    console.log(move);
    process.exit(0);
  }

  for (let z = 0; z < 4; z++) {
    const nx = cx + dx[z];
    const ny = cy + dy[z];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
      continue;
    }

    let isPossible = true;
    if (z == 0) {
      // 상 -> 윗면검사
      for (let i = 0; i < W; i++) {
        if (board[nx][ny + i] == 1) {
          isPossible = false;
          break;
        }
      }
    } else if (z == 1) {
      // 하 -> 아랫면 검사
      for (let i = 0; i < W; i++) {
        if (nx + H - 1 >= N || board[cx + H - 1][cy + i] == 1) {
          isPossible = false;
          break;
        }
      }
    } else if (z == 2) {
      // 좌 -> 왼쪽면 검사
      for (let i = 0; i < H; i++) {
        if (board[nx + i][ny] == 1) {
          isPossible = false;
          break;
        }
      }
    } else if (z == 3) {
      // 우 -> 오른쪽면 검사
      for (let i = 0; i < H; i++) {
        if (ny + W - 1 >= M || board[nx + i][ny + W - 1] == 1) {
          isPossible = false;
          break;
        }
      }
    }

    if (!isPossible) continue;

    if (!visited[nx][ny]) {
      visited[nx][ny] = true;
      queue.push([nx, ny, move + 1]);
    }
  }
}

console.log(-1);
