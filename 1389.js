const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1389.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input.shift().split(' ').map(Number);

const graph = Array.from(Array(N+1), ()=>new Array());
const d = Array.from(Array(N+1), ()=>new Array());
input.forEach((e) => {
  const [x,y] = e.split(' ').map(Number);
  graph[x].push(y);
  graph[y].push(x);
})

// 정점에서 각 정점까지의 최소거리 구함 (배열 d)
for(let i=1; i<=N; i++) {
  let queue = [];

  let level = 1;
  for(let j=0; j<graph[i].length; j++) {
    let index = graph[i][j];
    queue.push(index);
    d[i][index] = level;
  }

  level++;

  while(queue.length !== 0) {
    let qSize = queue.length;

    for(let j=0; j<qSize; j++) {
      let pop = queue.shift();

      for(let k=0; k<graph[pop].length; k++) {
        if( graph[pop][k] !== i && d[i][graph[pop][k]] === undefined ) {
          queue.push(graph[pop][k]);
          d[i][graph[pop][k]] = level;
        }
      }
    }

    level++;
  }

}

// console.log(d);

let min = 9999;
let answer = '';

for(let i=1; i<d.length; i++) {
  let sum = 0;
  let list = d[i];
  list.forEach(e=>{
    if(typeof e == 'number') sum+=e;
  })
  if(sum<min) {
    min = sum;
    answer = i;
  }
}

console.log(answer)