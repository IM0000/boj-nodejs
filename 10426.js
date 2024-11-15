// 기념일 2
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10426.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');

const d = new Date(input[0]);
d.setDate(d.getDate() + Number(input[1]) - 1);
console.log(d.toISOString().split('T')[0]);
