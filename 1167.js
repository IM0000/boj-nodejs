const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1167.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const V = +input[index++].trim();

const tree = [];

for(let i=0; i<V; i++) {
  const info = input[index++].split(' ').map(Number);

  for(let j=1; j<=info.length; j+=2) {
    if(info[j] === -1) break;
    if(!tree[info[0]]) tree[info[0]] = [];
    tree[info[0]].push({v: info[j], w: info[j+1]});
  }
}

let max = 0, maxV;
const dfs = (v, sum, visited) => {
  visited[v] = true;
  // console.log(v)
  
  if(max < sum) {
    max = sum;
    maxV = v;
  }
  
  for(let i=0; i<tree[v].length; i++) {
    let next = tree[v][i].v;
    
    if(!visited[next]) {
      dfs(next, sum + tree[v][i].w, visited);
    }
  }
  // visited[v] = false;
}
let visited = []
// 루트에서 가장 먼 지점 구하기
dfs(1, 0, visited);

// max, visited 초기화
max = 0;
visited = [];

// 루트에서 가장 먼 지점에서 (가장 먼 지점 + 트리의 지름) 구하기
dfs(maxV, 0, visited);

console.log(max);