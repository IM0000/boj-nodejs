const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '16562.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [N,M,k] = input[index++].split(' ').map(Number);
const aArr = input[index++].split(' ').map(Number);
const parent = Array.from({length:N+1},(_,i) => i);
const rank = Array.from({length:N+1}, () => 1);

for(let i=0; i<M; i++) {
  let [a,b] = input[index++].split(' ').map(Number);
  union(a,b);
}

const map = {};
for(let i=1; i<=N; i++) {
  findParent(i);
  if(!map[parent[i]]) {
    map[parent[i]] = aArr[i-1];
  } else {
    map[parent[i]] = Math.min(map[parent[i]], aArr[i-1]);
  }
}

let sum = 0;
for(num in map) {
  sum += map[num];
}

if(sum > k) console.log('Oh no');
else console.log(sum);

function findParent(x) {
  if(parent[x] === x) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b) {
  a = findParent(a);
  b = findParent(b);

  if(a === b) return;

  if(rank[a] > rank[b]) {
    parent[b] = a;
  } else {
    parent[a] = b;
    if(rank[a] === rank[b]) rank[b]++;
  }
}