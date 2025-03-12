// 서로 다른 부분 문자열의 개수
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11478.txt';
const input = fs.readFileSync(filePath).toString().trim();
const set = new Set();
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j <= input.length; j++) {
    set.add(input.slice(i, j));
  }
}
console.log(set.size);
