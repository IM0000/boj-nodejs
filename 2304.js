const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2304.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];
const arr = [];

for(let i = 0; i < N; i++) {
  const [x, y] = input[index++].split(' ').map(Number);
  arr.push([x, y]);
}

arr.sort((a,b) => a[0] - b[0]);

let area = 0;
for(let i = 0; i < N; i++) {
  const [x, H] = arr[i];

  let max = 0;
  for(let j = i + 1; j < N; j++) {
    if(arr[j][1] >= H) { // 큰 기둥 있을 때
      let nx = arr[j][0];
      area += (nx - x) * H;
      i = j - 1;
      max = 0;
      break;
    } else {
      if(max <= arr[j][1]) {
        max = arr[j][1];
        i = j;
      }
    }
  }

  if(max !== 0) {
    area += (H - arr[i][1]);
    area += (arr[i][0] - x) * arr[i][1];
    i -= 1;
  }

  if(i === arr.length-1) {
    area += (arr[i][1]);
  }
}

console.log(area);

/* 
5
1 5
2 4
3 3
4 2
5 1 
*/