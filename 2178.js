const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2178.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input.shift().split(' ').map(Number);
let map = Array(N);
let visit = Array(N);

for(let i=0; i<N; i++) {
  map[i] = input.shift().split('').map(Number);
  visit[i] = Array(map[i].length).fill(false);
}

let ans = bfs(0,0);

function bfs(x,y) {
  const dx = [0,0,-1,1];
  const dy = [-1,1,0,0];
  let count = 1;
  let queue = [];
  visit[x][y] = true;
  queue.push({x,y})

  while(queue.length !== 0) {
    let qSize = queue.length;

    for(let i=0; i<qSize; i++) {
      let {x,y} = queue.shift();

      for(let z=0; z<4; z++) {
        let nx = x + dx[z];
        let ny = y + dy[z];

        if(nx<0 || nx>=N || ny<0 || ny>=M) continue;
        if(map[nx][ny] === 0) continue;

        if(!visit[nx][ny]) {
          visit[nx][ny] = true;
          queue.push({x:nx,y:ny});
        }

        if(nx === N-1 && ny === M-1) { // 도착지점 도달
          return count+1;
        }
      }
    }
    count++;
  }
}

// console.log(map)
// console.log(visit)
console.log(ans);