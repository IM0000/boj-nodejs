const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1865.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let TC = +input[index++].trim();
let dist;
// 벨만포드
const bf = (linkInfo, N) => {
  // console.log(linkInfo)
  // 최단 거리 초기화
  dist[1] = 0;
  for(let i=1; i<=N; i++) { // N번
    for([S,E,T] of linkInfo) {
      if(dist[E] > dist[S] + T) {
        dist[E] = dist[S] + T;
        if(i === N) {
          return true;
        }
      }
    }
  }
  return false;
}

let answer = [];
while(TC--) {
  const [N,M,W] = input[index++].trim().split(' ').map(Number);
  dist = Array(N+1).fill(9999999999);
  const linkInfo = [];
  for(let i=0; i<M; i++) {
    const [S,E,T] = input[index++].trim().split(' ').map(Number);

    linkInfo.push([S,E,T]);
    linkInfo.push([E,S,T]);
  }

  for(let i=0; i<W; i++) {
    const [S,E,T] = input[index++].trim().split(' ').map(Number);

    linkInfo.push([S,E,-T]);
  }

  let result = bf(linkInfo, N);

  result ? answer.push('YES') : answer.push('NO');
}

console.log(answer.join('\n'));