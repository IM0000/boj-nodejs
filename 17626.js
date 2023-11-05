const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17626.txt';
let n = fs.readFileSync(filePath).toString().trim();
n = +n;

const dp = [];
dp[0]=0, dp[1]=1;

for(let i=2; i<=n; i++) {
  min = 50001;

  for(let j=1; j<=Math.sqrt(i); j++) {
    min = Math.min(min, dp[i-Math.pow(j,2)]);
  }

  dp[i] = min + 1;
}

console.log(dp[n]);

// const sArr = [];
// for(let i=0; i<=223; i++) {
//   sArr.push(Math.pow(i,2));
// }

// let cnt = 1;

// while( n - sArr[findMaxIndex(n)] !== 0) {
//   n = n - sArr[findMaxIndex(n)];
//   cnt++;
// }

// console.log(cnt);

// function findMaxIndex(num) {
//   for(let i=0; i<=233; i++) {
//     if( num - sArr[i] < 0) {
//       return i-1;
//     }
//   }
// }