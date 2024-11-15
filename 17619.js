const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17619.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, Q] = input[index++].split(' ').map(Number);

const arr = Array(N); // [x1, x2, n]
const type = Array(N + 1);

for (let i = 0; i < N; i++) {
  const [x1, x2, y] = input[index++].split(' ').map(Number);
  arr.push([x1, x2, i + 1]);
}

arr.sort((a, b) => a[0] - b[0]);

let tx1 = arr[0][0];
let tx2 = arr[0][1];

let typ = 0;
for (let i = 0; i < N; i++) {
  const [nx1, nx2, n] = arr[i];

  if (nx1 <= tx2) {
    tx2 = Math.max(tx2, nx2);
    type[n] = typ;
  } else {
    typ++;
    tx1 = nx1;
    tx2 = nx2;
    type[n] = typ;
  }
}

let ans = '';
for (let i = 0; i < Q; i++) {
  const [q1, q2] = input[index++].split(' ').map(Number);
  if (type[q1] === type[q2]) ans += '1\n';
  else ans += '0\n';
}
console.log(ans.trim());
