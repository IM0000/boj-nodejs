const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '18111.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, B] = input[0].split(' ').map(Number);

let index = 1;
let map = [];
for(let i=0; i<N; i++) {
  let row = input[index++].split(' ');
  map[i] = [];
  for(let j=0; j<M; j++) {
    let nob = Number(row[j])
    map[i].push(nob);
  }
}

// 1. 좌표 (i, j)의 가장 위에 있는 블록을 제거하여 인벤토리에 넣는다. -> 2초
// 2. 인벤토리에서 블록 하나를 꺼내어 좌표 (i, j)의 가장 위에 있는 블록 위에 놓는다. -> 1초
// 0 <= h <= 256
let res = [];
let minTime = Number.MAX_SAFE_INTEGER;
for(let i=0; i<=256; i++) {
  let time = 0;
  let inventory = B;
  for(let j=0; j<N; j++) {
    for(let k=0; k<M; k++) {
      let diff = map[j][k] - i;
      if(diff === 0) continue;
      if(diff > 0) {
        time += diff * 2;
        inventory += diff;
      } else {
        time += Math.abs(diff);
        inventory -= Math.abs(diff);
      }
    }
  }

  if(inventory < 0) continue;
  if(time <= minTime) {
    minTime = time;
  }
  res.push([time, i]);
}

res = res.filter(r => r[0] === minTime).sort((a,b) => b[1]-a[1]);
console.log(res[0].join(' '));
