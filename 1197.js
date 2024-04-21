const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1197.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [V, E] = input[index++].split(' ').map(Number);

const graph = [];
for (let i = 0; i < E; i++) {
  const [a, b, c] = input[index++].split(' ').map(Number);
  graph.push([a, b, c]);
}

const parent = Array(V + 1).fill(0).map((_, i) => i);
const rank = Array(V + 1).fill(1);

graph.sort((a, b) => a[2] - b[2]);
let answer = 0;
for(let i=0; i<graph.length; i++) {
  const [a, b, c] = graph[i];
  if(findParent(a) === findParent(b)) continue;
  union(a, b);
  answer += c;
}

console.log(answer);

function findParent(x) {
  if (parent[x] === x) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b) {
  a = findParent(a);
  b = findParent(b);
  
  if(a === b) return;

  if(rank[a] < rank[b]) parent[a] = b;
  else parent[b] = a;
  
  if(rank[a] === rank[b]) rank[a]++;
}