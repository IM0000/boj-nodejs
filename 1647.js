const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1647.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n,m] = input[index++].split(' ').map(Number);
const parent = Array.from({length:n+1},(_,i)=>i);
const rank = Array(n + 1).fill(1);

const edges = [];
for(let i=0;i<m;i++){ 
  const [a,b,c] = input[index++].split(' ').map(Number);
  edges.push([a,b,c]);
}

edges.sort((a,b)=>a[2]-b[2]);

let last = 0;
let answer = 0;
for(let i=0;i<edges.length;i++){
  const [a,b,c] = edges[i];
  if(findParent(a) === findParent(b)) continue;
  union(a,b);
  answer += c;
  last = c;
}

console.log(answer-last);

function findParent(x){
  if(x===parent[x]) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b){
  a = findParent(a);
  b = findParent(b);

  if(a===b) return;

  if(rank[a] < rank[b]) parent[a] = b;
  else parent[b] = a;

  if(rank[a] === rank[b]) rank[a]++;
}