const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11444.txt';
const input = fs.readFileSync(filePath).toString().trim();
const n = Number(input);


const B0 = BigInt(0);
const B1 = BigInt(1);
const B2 = BigInt(2);
const fibonacciMemory = {};
fibonacciMemory[B0] = BigInt(0);
fibonacciMemory[B1] = BigInt(1);
fibonacciMemory[B2] = BigInt(1);
// console.log("🚀 ~ file: 11444.js:14 ~ fibonacciMemory:", fibonacciMemory)
// console.log("🚀 ~ file: 11444.js:16 ~ fibonacciMemory.hasOwnProperty(n):", fibonacciMemory.hasOwnProperty(3))
function fibonacci(n) {
  if (!fibonacciMemory.hasOwnProperty(n)) {
    const f_n = fibonacci(n/B2);
    const f_nM1 = fibonacci(n/B2-B1);
    const f_nP = fibonacci(n/B2+B1);
    const f_nM = fibonacci((n-B1)/B2);
    if (n % B2 === B0) {
        fibonacciMemory[n] = ((f_n * ((2n*f_nM1 + f_n) % (1000000007n)) ) % (1000000007n));
    } else {
        fibonacciMemory[n] = (f_n * f_n % (1000000007n) + f_nP * f_nP % (1000000007n)) % (1000000007n);
    }
  }

  return fibonacciMemory[n];
}

console.log(Number(fibonacci(BigInt(n)) % 1000000007n));

