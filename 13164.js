const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '13164.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
let dist = [];

for(let i=0; i<arr.length - 1; i++) {
  dist.push(arr[i+1] - arr[i]);
}
dist.sort((a,b) => a-b);

let cost = 0;
for(let i=0; i<dist.length - (K-1); i++) {
  cost += dist[i];
}

console.log(cost);
