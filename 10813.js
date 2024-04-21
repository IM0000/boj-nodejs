const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '10813.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [N,M] = input[index++].split(' ').map(Number);
let arr = Array.from({length:N},(_,i)=>i+1);

for(let i=0; i<M; i++){
  let [a,b] = input[index++].split(' ').map(Number);
  [arr[a-1],arr[b-1]] = [arr[b-1],arr[a-1]];
}

console.log(arr.join(' '));