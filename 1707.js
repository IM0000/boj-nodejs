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

  add(data) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.size === 0) return null;
    const removedData = this.front.data;
    this.front = this.front.next;
    this.size--;
    if (this.size === 0) this.rear = null;
    return removedData;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1707.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();
let answer = '';

while (T--) {
  let [V, E] = input[index++].trim().split(' ').map(Number);
  let graph = Array.from(Array(V + 1), () => []);
  let color = Array(V + 1).fill(-1);

  for (let i = 0; i < E; i++) {
    let [a, b] = input[index++].trim().split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  let isBipartite = true;

  const bfs = (start) => {
    let queue = new Queue();
    queue.add(start);
    color[start] = 0;

    while (queue.size !== 0) {
      let cur = queue.pop();
      for (let next of graph[cur]) {
        if (color[next] === -1) {
          color[next] = 1 - color[cur];
          queue.add(next);
        } else if (color[next] === color[cur]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let i = 1; i <= V; i++) {
    if (color[i] === -1) {
      if (!bfs(i)) {
        isBipartite = false;
        break;
      }
    }
  }

  if (isBipartite) {
    answer += 'YES\n';
  } else {
    answer += 'NO\n';
  }
}

console.log(answer.trim());
