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
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
    this.size++;
  }

  pop() {
    if (this.size === 0) return null;

    const removedData = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return removedData;
  }
}

function getIndex(c) {
  if (c.charCodeAt() >= 65 && c.charCodeAt() <= 90) return c.charCodeAt() - 65;
  else return c.charCodeAt() - 71;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '6086.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++].trim();
const graph = Array.from({ length: 52 }, () => []);
const c = Array.from({ length: 52 }, () => Array(52).fill(0));
const f = Array.from({ length: 52 }, () => Array(52).fill(0));

for (let i = 0; i < N; i++) {
  let [s, e, capa] = input[index++].trim().split(' ');
  s = getIndex(s);
  e = getIndex(e);
  graph[s].push(e);
  graph[e].push(s);
  c[s][e] += +capa;
  c[e][s] += +capa;
}

console.log(getMaxFlow(0, 25));

function getMaxFlow(start, end) {
  let result = 0;

  while (true) {
    let visited = Array(52).fill(-1);
    let q = new Queue();
    q.push(start);
    visited[start] = start;

    while (q.size != 0) {
      let pop = q.pop();
      if (pop === end) break;
      for (let i = 0; i < graph[pop].length; i++) {
        let next = graph[pop][i];
        // 방문 x & 남은 용량이 0이상
        if (visited[next] === -1 && c[pop][next] - f[pop][next] > 0) {
          visited[next] = pop;
          q.push(next);
        }
      }
    }

    if (visited[end] === -1) break; // 새로운 경로 못찾은 경우

    // 유량 계산
    let flow = Number.MAX_VALUE;
    for (let i = end; i != start; i = visited[i]) {
      flow = Math.min(flow, c[visited[i]][i] - f[visited[i]][i]);
    }

    for (let i = end; i != start; i = visited[i]) {
      f[visited[i]][i] += flow;
      f[i][visited[i]] -= flow;
    }

    result += flow;
  }

  return result;
}
