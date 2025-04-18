const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

const str = input[0].trim();
const arr = Array(26).fill(0);

console.log('a'.charCodeAt() - 97);

for (let i = 0; i < str.length; i++) {
  let chr = str[i];
  let idx = chr.charCodeAt() - 97;
  arr[idx]++;
}

console.log(arr.join(' ').trim());
