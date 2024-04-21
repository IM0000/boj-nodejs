const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14391.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [N, M] = input[index++].split(' ').map(Number);
let arr = [];
for(let i=0; i<N; i++){
  arr.push(input[index++].split('').map(Number));
}
let max = 0;
let limit = 1 << N*M;

for(let bin=0; bin<limit; bin++){
  let visit = 0;
  let sum = 0;
  for(let s = 1<<N*M-1; s > 0; s = s >> 1) {
    if(s & visit) continue;
    let temp = '';

    // n => (x,y)
    let p = Math.log2(s);
    let x = Math.abs(Math.floor(p / M) - (N-1));
    let y = Math.abs(p % M - (M-1));
    
    temp += arr[x][y];
    
    let d = s;
    
    if((bin & s) == s) { // 1일 때
      d = d >> M;
      while(d > 0 && ((bin & d) == d)) {
        if(d & visit) continue;
        let nx = Math.abs(Math.floor(Math.log2(d) / M) - (N-1));
        let ny = Math.abs(Math.log2(d) % M - (M-1));
        visit |= d;
        
        temp += arr[nx][ny];
        d = d >> M;
      }
    } else { // 0일 때
      d = d >> 1;
      while(d > 0 && ((bin & d) == 0)) {
        if(d & visit) continue;
        let nx = Math.abs(Math.floor(Math.log2(d) / M) - (N-1));
        let ny = Math.abs(Math.log2(d) % M - (M-1));

        if(nx > x) break;
        visit |= d;
        
        temp += arr[nx][ny];
        d = d >> 1;
      }
    }
    sum += +temp;
    max = Math.max(max, sum);
  }
}

console.log(max);

// 2048 (12번쨰)
// N=4, M=3 
// 가로움직임: / 2
// 세로움직임: >> M
// 2048 => (0,0) / 1024 => (0,1) / 512 => (0,2)
// 256 => (1,0)
// 32 => (2,0)
// 4 => (3,0)

// 0: 가로, 1: 세로
// 111 (256) 111 (32) 111 (4) 111 (0)

/* (3,2) -> (0,0) / (3,1) -> (0,1)
(2,2) -> (1,0)
11 10 9 > 3
8  7  6 > 2
5  4  3 > 1
2  1  0 > 0

2  1  0
*/