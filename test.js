const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();

let D = 0;
let P = 0;
for (let i = 1; i <= n; i++) {
  let char = input[i].trim();
  if (char === 'D') D++;
  if (char === 'P') P++;
  if (Math.abs(D - P) >= 2) break;
}
console.log(`${D}:${P}`);
