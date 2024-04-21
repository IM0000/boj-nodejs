const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4386.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
let n = +input[index++].trim();
let rank = Array(n).fill(1);
let parent = Array.from({length: n}, (_,i)=>i);

let stars = [];
for(let i=0; i<n; i++) {
  let [x,y] = input[index++].split(' ').map(Number);
  stars.push([i,x,y]);
}

let edges = [];
for(let i=0; i<n; i++) {
  let [ai,ax,ay] = stars[i];
  for(let j=i+1; j<n; j++) {
    let [bi,bx,by] = stars[j];
    let dx = Math.abs(bx-ax);
    let dy = Math.abs(by-ay);
    let dist = +Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)).toFixed(2);
    edges.push([ai,bi,dist]);
  }
}

edges.sort((a,b) => a[2]-b[2]);

let sum = 0;
for(let i=0; i<edges.length; i++) {
  let [a,b,d] = edges[i];
  a = findRoot(a);
  b = findRoot(b);
  if(a === b) continue;
  union(a,b);
  sum += d;
}

console.log(sum);

function findRoot(a) {
  if(parent[a] === a) return a;
  return parent[a] = findRoot(parent[a]);
}

function union(a, b) {
  a = findRoot(a);
  b = findRoot(b);

  if(a === b) return;

  if(rank[a]<rank[b]) parent[a] = b;
  else parent[b] = a;

  if(rank[a] === rank[b]) rank[a]++;
}