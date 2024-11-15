const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2902.txt';
const input = fs.readFileSync(filePath).toString().trim();

let ans = '';
input.split('-').forEach((item) => {
  ans += item[0];
});
console.log(ans);
