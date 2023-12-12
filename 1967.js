const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1967.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const n = +input[index++].trim();

if(n === 1) console.log(0);
else {

  const graph = Array(n+1);
  const visited = Array(n+1).fill(false);
  
  for(let i=0; i<n-1; i++) {
    const row = input[index++].split(' ').map(Number);
    
    if(!graph[row[0]]) graph[row[0]] = [];
    graph[row[0]].push({v: row[1], w: row[2]});
  
    if(!graph[row[1]]) graph[row[1]] = [];
    graph[row[1]].push({v: row[0], w: row[2]});
  }
  
  // console.log(graph);
  let maxValue = 0;
  let maxNode = 0;
  
  const dfs = (cur, val = 0) => {
    visited[cur] = true;
  
    if(maxValue < val) {
      maxValue = val;
      maxNode = cur;
    }
  
    for(let i=0; i<graph[cur].length; i++) {
      let next = graph[cur][i].v;
  
      if(!visited[next]) {
        dfs(next, val + graph[cur][i].w);
      }
    }
  }
  // 1. 루트로 부터 가장 먼 정점(=a)을 구한다.
  dfs(1,0)
  // console.log(maxValue,maxNode);
  
  // maxValue, maxNode, visited 초기화
  const a = maxNode;
  maxNode = 0, maxValue = 0, visited.fill(false);
  
  // 2. a점으로 부터 가장 먼 정점(=b)까지의 거리를 구한다.
  dfs(a,0);
  
  // a~b가 트리의 지름
  console.log(maxValue);
}