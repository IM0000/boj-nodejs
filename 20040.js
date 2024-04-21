const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20040.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n, m] = input[index++].split(' ').map(Number);
const parent = Array.from({ length: n }, (_, i) => i);
const rank = Array.from({ length: n }, () => 1);

let answer = 0;
for(let i=0; i<m; i++) {
  let [a,b] = input[index++].split(' ').map(Number);
  if(findParent(a) === findParent(b)) {
    answer = i+1;
    break;
  }
  union(a,b);
}

console.log(answer);

function findParent(x) {
  if(parent[x] === x) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b) {
  a = findParent(a);
  b = findParent(b);

  if(a === b) return true;

  if(rank[a] < rank[b]) parent[a] = b;
  else parent[b] = a;

  if(rank[a] === rank[b]) rank[a]++;
  return false;
}