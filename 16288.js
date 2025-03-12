// Passport Control
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16288.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const check = Array.from({ length: n + 1 }, () => false);

let cnt = 0;
while (k - cnt) {
  let cur;
  for (let i = 0; i < n; i++) {
    if (check[arr[i]]) continue;

    if (!cur) {
      cur = arr[i];
      check[arr[i]] = true;
    }

    if (cur && cur < arr[i]) {
      cur = arr[i];
      check[arr[i]] = true;
    }
  }

  cnt++;
}
let answer = 'YES';

for (let i = 1; i <= n; i++) {
  if (!check[i]) {
    answer = 'NO';
    break;
  }
}

console.log(answer);
