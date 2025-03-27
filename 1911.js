// 흙길 보수하기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1911.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, l] = input[0].split(' ').map(Number);
const arr = [];
for (let i = 1; i <= n; i++) {
  let [s, e] = input[i].split(' ').map(Number);
  arr.push([s, e - 1]);
}

arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
});
let count = 0;
let last = -1;
let i = -1;
while (++i < arr.length) {
  let [s, e] = arr[i];

  if (last >= e) {
    continue;
  }

  if (last >= s && last < e) {
    last = last + l;
  } else if (last < s) {
    last = s + l - 1;
  }

  count++;

  while (last < e) {
    count++;
    last = last + l;
  }
}

console.log(count);
