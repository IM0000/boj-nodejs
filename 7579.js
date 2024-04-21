const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7579.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [n,m] = input[index++].split(' ').map(Number);
let a = input[index++].split(' ').map(Number);
let c = input[index++].split(' ').map(Number);

let dp = Array(10001).fill(0); // 인덱스 == 비용

for(let i=0; i<n; i++) {

  for(let j=10000; j>=0; j--) { 
    // j만큼의 비용으로 최대로 확보할 수 있는 메모리
    if(j >= c[i]) dp[j] = Math.max(dp[j], dp[j-c[i]] + a[i]);
  }
}

let cost = 0;
while(dp[cost] < m) cost++;
console.log(cost)
