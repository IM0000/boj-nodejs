const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11403.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0].trim());
const graph = [];

for(let i=0; i<N; i++) {
  graph[i] = [];
  input[i+1].trim().split(' ').forEach((e,index) => {
    if(Number(e) === 1) graph[i].push(index);
  });
}

const output = Array.from(Array(N), () => Array(N).fill(0));

for(let i=0; i<N; i++) { // 시작점 i부터 시작 
  let queue = [];
  
  for(let j=0; j<graph[i].length; j++) { // i에서 갈 수 있는 정점을 큐에 넣음
    let element = graph[i][j];
    output[i][element] = 1;
    queue.push(element);
  }

  while(queue.length !== 0) { // 큐가 비어질 때 까지
    let pop = queue.shift();

    for(let j=0; j<graph[pop].length; j++) { // 큐에서 뽑힌 숫자에서 갈 수 있는 곳을 돌면서 방문 안했으면 큐에 넣음
      let element = graph[pop][j];

      if(output[i][element] !== 1) {
        output[i][element] = 1;
        queue.push(element);
      }
    }
  }

}

let ans = '';
for(let i=0; i<output.length; i++) {
  ans += output[i].join(' ').trim() + '\n';
}

console.log(ans.trim());