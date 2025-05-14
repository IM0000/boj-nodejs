// 결합
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '24533.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = +input[0].trim();
const arr = input.slice(1).map((item) => item.split(' ').map(BigInt));
let [sumCol1, sumCol2, sum] = [0n, 0n, 0n];
for (let i = 0; i < N; i++) {
  let [a, b] = arr[i];
  sumCol1 += a;
  sumCol2 += b;
  sum += a * b;
}
console.log((sumCol1 * sumCol2 - sum).toString());
