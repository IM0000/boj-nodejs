const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15900.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++];
let visited = Array(N + 1).fill(false);
let graph = Array.from(Array(N + 1), () => []);
let depthSum = 0;

for(let i=1; i<input.length; i++) {
  let [a, b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

let stack = [[0,1]];
visited[1] = true;

while(stack.length) {
  let [depth, node] = stack.pop();
  
  let isLeaf = true;
  for(let i=0; i<graph[node].length; i++) {
    let next = graph[node][i];
    if(visited[next]) continue;
    isLeaf = false;
    visited[next] = true;
    if(graph[next].length === 1) {
      depthSum += depth + 1;
    } else {
      stack.push([depth + 1, next]);
    }
  }
}

if(depthSum%2 == 0) {
  console.log("No");
} else {
  console.log("Yes");
}

