const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '6118.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [n,m] = input[index++].split(' ').map(Number);
let graph = Array.from(Array(n+1), () => Array());

for(let i=0; i<m; i++){
  let [a,b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

let visit = Array(n+1).fill(0);
let queue = [];
let curIdx = 0;

// 1번 방문
queue.push([1,0]);
visit[1] = 1;
let dist = 0;
let h = [];

while(queue.length > curIdx) {
  let pop = queue[curIdx++];
  
  let num = pop[0];
  let d = pop[1];
  dist = Math.max(dist, d);
  for(let i=0; i<graph[num].length; i++){
    if(visit[graph[num][i]] === 0){
      visit[graph[num][i]] = 1;
      queue.push([graph[num][i], d+1]);

      if(h.length === 0) h.push([graph[num][i], d+1]);
      else if(h[0][1] === d+1) h.push([graph[num][i], d+1]);
      else if(h[0][1] < d+1) {
        h = [];
        h.push([graph[num][i], d+1]); 
      }
    }
  }
}
h.sort((a,b) => a[0] - b[0]);
console.log(h[0][0], dist, h.length);