// 하늘과 핑크
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31473.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0].trim();
const A = input[1]
  .split(' ')
  .map(Number)
  .reduce((p, c) => p + c, 0);
const B = input[2]
  .split(' ')
  .map(Number)
  .reduce((p, c) => p + c, 0);
console.log(`${B} ${A}`);
