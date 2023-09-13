const filePath = process.platform === 'linux' ? '/dev/stdin' : '2630.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n').map(e=>e.trim());

const N = +input.shift();
let k = Math.log2(N);
let coord = [];
input.forEach(e=>{
  let inner = e.split(' ').map(Number);
  coord.push(inner);
})


console.log(N)
console.log(k)
console.log(coord)