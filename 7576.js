const fs = require('fs');
const filePath = process.platform === 'linux' ?  '/dev/stdin' : '7576.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M,N] = input.shift().split(' ').map(Number);

