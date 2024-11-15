const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '19942.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const target = input[index++].split(' ').map(Number);
const arr = [];

for(let i=0; i<N; i++) {
  arr.push([...input[index++].split(' ').map(Number), (i+1)]);
}
// arr.sort((a,b)=>a[4]-b[4]);

let minCost = 10000;
let num = [];

dfs([0,0,0,0,0], [], 0);

function dfs(sumArr, pickArr, n) {
  if(sumArr[0] >= target[0] 
    && sumArr[1] >= target[1] 
    && sumArr[2] >= target[2] 
    && sumArr[3] >= target[3]
    && sumArr[4] < minCost) {
      minCost = sumArr[4];
      num = [...pickArr];
    }

  for(let i=n; i<arr.length; i++) {
    if(sumArr[4]+arr[i][4] < minCost) {
      dfs(
        [sumArr[0]+arr[i][0], sumArr[1]+arr[i][1], sumArr[2]+arr[i][2], sumArr[3]+arr[i][3], sumArr[4]+arr[i][4]], 
        [...pickArr, arr[i][5]], 
        i+1
      );
    }
    dfs(sumArr, pickArr, i+1);
  }
}
if(minCost === 10000) { 
  console.log(-1);
} else {
  console.log(minCost);
  console.log(num.join(' '));
}