const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2961.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const arr = input.map((x) => x.split(' ').map(BigInt));

let min = 1000000000n;
function bt(start, s, b, select) {
  if (start == N && select != 0) {
    let diff = s > b ? s - b : b - s;
    if (diff < min) min = diff;
    return;
  }

  for (let i = start; i < arr.length; i++) {
    bt(i + 1, s * arr[i][0], b + arr[i][1], select + 1);
    bt(i + 1, s, b, select);
  }
}
bt(0, 1n, 0n, 0);
console.log(Number(min));
