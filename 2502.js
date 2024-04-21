function power(matrix, n) {
  if (n === 1) {
    return matrix;
  } else if (n % 2 === 0) {
    const half = power(matrix, n / 2);
    return multiplyMatrix(half, half);
  } else {
    const half = power(matrix, (n - 1) / 2);
    const multiplied = multiplyMatrix(half, half);
    return multiplyMatrix(matrix, multiplied);
  }
}

function multiplyMatrix(matrix1, matrix2) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  const matrix = [[1, 1], [1, 0]];
  const result = power(matrix, n - 1);
  
  return result[0][0];
}


const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2502.txt';
const [D,K] = fs.readFileSync(filePath).toString().split(' ').map(Number);
let A,B;
let n = 1;
let fD2 = fibonacci(D-2);
let fD = fibonacci(D);

while(true) {
  B = (K + fD2*n) / fD;
  if(Number.isInteger(B)) {
    break;
  }
  n++;
}

A = B - n;

console.log(`${A}\n${B}`);
