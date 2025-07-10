class Deque {
  constructor() {
    this.queue = [];
  }

  frontPush(data) {
    this.queue.unshift(data);
  }

  frontPop() {
    return this.queue.shift();
  }

  push(data) {
    this.queue.push(data);
  }

  pop() {
    return this.queue.pop();
  }
}

const input = require('fs')
  .readFileSync('./32197.txt', 'utf-8')
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < m; i++) {
  const [s, e, t] = input[i + 1].split(' ').map(Number);
  graph[s].push([e, t]);
  graph[e].push([s, t]);
}

const [a, b] = input[m + 1].split(' ').map(Number);
const visited = Array.from({ length: n + 1 }, () => Array(2).fill(false));
const deq = new Deque();
deq.push([a, 0, 0]);
deq.push([a, 0, 1]);
let answer;

while (deq.queue.length > 0) {
  let [cur, cnt, curT] = deq.frontPop();
  visited[cur][curT] = true;

  if (cur === b) {
    answer = cnt;
    break;
  }

  let nextList = graph[cur];
  for (let i = 0; i < nextList.length; i++) {
    let [next, t] = nextList[i];

    if (visited[next][t]) {
      continue;
    }

    if (curT === t) {
      deq.frontPush([next, cnt, t]);
    } else {
      deq.push([next, cnt + 1, t]);
    }
  }
}
console.log(answer);
