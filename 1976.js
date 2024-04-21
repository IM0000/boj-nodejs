const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1976.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].toString().trim();
const M = +input[index++].toString().trim();
const parent = Array.from({length: N+1}, (_,i) => i);
const rank = Array.from({length: N+1}, () => 0);

for(let i=0; i<N; i++) {
  const arr = input[index++].toString().trim().split(' ').map(Number);
  for(let j=0; j<arr.length; j++) {
    if(arr[j] === 1) {
      union(i,j);
    }
  }
}

let travel = input[index++].toString().trim().split(' ').map(item=>+item-1);
let temp;
let answer = 'YES';
for(let i = 0; i < travel.length; i++) {
  if(i === 0) {
    temp = findParent(travel[i]);
  } else {
    if(temp !== findParent(travel[i])) {
      answer = 'NO';
      break;
    }
  }
}

console.log(answer);


function findParent(x) {
  if(parent[x] === x) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b) {
  a = findParent(a);
  b = findParent(b);

  if(a === b) return;

  if(rank[a]<rank[b]) parent[a] = b;
  else parent[b] = a;

  if(rank[a] === rank[b]) rank[a]++;
}
