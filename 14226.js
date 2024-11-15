class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  pop() {
    if (!this.head) return;
    const node = this.head;
    this.head = node.next;
    this.size--;
    return node.data;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14226.txt';
const input = +fs.readFileSync(filePath).toString().trim();

/* 
1 화면에 있는 이모티콘을 모두 복사해서 클립보드에 저장한다.
2 클립보드에 있는 모든 이모티콘을 화면에 붙여넣기 한다.
3 화면에 있는 이모티콘 중 하나를 삭제한다.
1->2: n + n = 2n
3: n-1
3->1->2: n + (n-1) = 2n+1
*/
// 1/0, 1/1, 2/2, 3/3, 3/4, 6/5, 9/6, 9/7, 18/8
const bfs = () => {
  const visited = Array.from({length: input*2+1}, () => Array(input*2+1).fill(-1));
  const queue = new Queue();
  queue.push([1, 0, 0]); // [크기, 시간, clipboard]
  visited[1][0] = 0;

  while(queue.size != 0) {
    const [x, t, c] = queue.pop();

    if(x <= 0 || x >= 2000 || x+c >= input*2) continue;

    if(x === input) {
      return t;
    }
    if(visited[x][x] == -1 || visited[x][x] > t+1) {
      visited[x][x] = t+1;
      queue.push([x, t+1, x]);
    }
    if(visited[x+c][c] == -1 || visited[x+c][c] > t+1) {
      visited[x+c][c] = t+1;
      queue.push([x+c, t+1, c]);
    }
    if(visited[x-1][c] == -1 || visited[x-1][c] > t+1) {
      visited[x-1][c] = t+1;
      queue.push([x-1, t+1, c]);
    }
  }
}
console.log(bfs());