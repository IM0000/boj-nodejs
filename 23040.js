// 누텔라 트리(Easy)
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23040.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[index++].trim().split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const parent = Array.from({ length: N + 1 }, (_, i) => i);
const groupCount = Array.from({ length: N + 1 }, () => 0);
const colors = ['', ...input[index++].trim().split('')];
const reds = [];
const blacks = [];
for (let i = 1; i < colors.length; i++) {
  if (colors[i] === 'R') {
    groupCount[i] = 1;
    reds.push(i);
  } else {
    blacks.push(i);
  }
}

for (let i = 0; i < reds.length; i++) {
  let node = reds[i];
  for (let j = 0; j < graph[node].length; j++) {
    if (colors[graph[node][j]] === 'R') {
      union(node, graph[node][j]);
    }
  }
}

let answer = 0;
for (let i = 0; i < blacks.length; i++) {
  let node = blacks[i];
  for (let j = 0; j < graph[node].length; j++) {
    if (colors[graph[node][j]] === 'R') {
      const pNode = findParent(graph[node][j]);
      answer += groupCount[pNode];
    }
  }
}

console.log(answer);

function findParent(x) {
  if (parent[x] === x) return x;
  return (parent[x] = findParent(parent[x]));
}

function union(a, b) {
  a = findParent(a);
  b = findParent(b);
  if (a !== b) {
    parent[b] = a;
    groupCount[a] += groupCount[b];
  }
}
