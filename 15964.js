const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15964.txt';
const input = fs.readFileSync(filePath).toString().trim();

const [A,B] = input.split(' ').map(Number);

function a(A,B) {
  return (A+B)*(A-B);
}

console.log(a(A,B))