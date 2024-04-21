const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1660.txt';
let input = +fs.readFileSync(filePath).toString().trim();

const dp = [1];
const ddp = [1];
for(let i = 1; i < 120; i++) {
  let t = dp[i-1] + i + 1;
  dp.push(t);
  ddp[i] = ddp[i-1] + dp[i];
}

const dddp = Array(300001).fill(Number.MAX_SAFE_INTEGER); 
// dddp[i] : i개일 때 최소 사면체 수 : Math.min(dddp[i-ddp[j]] + 1, dddp[i])
dddp[0] = 0;
dddp[1] = 1;

for(let i=0; i<=300000; i++) {
  for(let j=0; j<ddp.length; j++) {
    if(ddp[j] > i) break;
    dddp[i] = Math.min(dddp[i-ddp[j]] + 1, dddp[i]);
  }
}
console.log(dddp[input]);