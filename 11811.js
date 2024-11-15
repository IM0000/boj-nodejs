const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11811.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const matrix = [];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

const result = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i !== j) {
      result[i] |= matrix[i][j];
    }
  }
}

console.log(result.join(' '));
