const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17219.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input.shift().split(' ').map(Number);
const map = {};

for(let i=0; i<N; i++) {
  const [key, value] = input[i].split(' ');
  map[key] = value;
}

let ans = '';
for(let i=N; i<N+M; i++) {
  let key = input[i].trim();
  ans += map[key] + '\n';
}

console.log(ans.trim());