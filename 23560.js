const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23560.txt';
const input = +fs.readFileSync(filePath).toString().trim();

console.log(2 * Math.pow(3, input - 1));
