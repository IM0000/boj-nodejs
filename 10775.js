const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10775.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let G = +input[0].trim();
let parent = Array(G+1).fill(0).map((_,i) => i);
let P = +input[1].trim();

let gArr = input.slice(2).map(Number);
let answer = 0;
for(let i=0; i<gArr.length; i++) {
  let gate = findParent(gArr[i]);
  if(gate != 0) {
    answer++;
    union(gate, gate-1);
  } else {
    break;
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
  if(a !== b) parent[a] = b;
}