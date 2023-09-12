const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2606.txt';
const input = fs.readFileSync(filePath).toString().split('\n').map(e=>e.trim());

const n = +input.shift(); // 컴퓨터 수
const m = +input.shift(); // 연결 수

const graph = [];
for (let i=0; i<=n; i++) graph.push([]);

for(var i=0; i<m; i++) {
  const [x,y] = input[i].split(' ').map(Number);
  // console.log([x,y])
  graph[x].push(y);
  graph[y].push(x);
}

const visited = [true, ...new Array(n).fill(false)];
let cnt = 0;

function bfs(x) {
  let queue = [];
  queue.push(x);
  visited[x] = true;
  cnt++;
  while (queue.length != 0) {
    let pop = queue.shift();
    
    for(let y of graph[pop]) {
      if(!visited[y]) {
        // console.log('###')
        visited[y] = true;
        cnt++
        queue.push(y);
      }
    }
  }
    
}
bfs(1);
console.log(cnt-1);
