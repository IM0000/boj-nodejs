const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1887.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [T, N] = input[0].split(' ').map(Number);

let s = 2 ** T;
let e = 2 ** (T + 1);

const comb = Array.from({ length: T + 1 }, () => []);
for (let i = 1; i <= N; i++) {
  let [n, ...arr] = input[i].split(' ').map(Number);
  comb[n].push(arr);
}

let ans = 0;
for (let i = s; i < e; i++) {
  let temp = i;
  let no = false;
  for (let j = 1; j < comb.length; j++) {
    for (let k = 0; k < comb[j].length; k++) {
      no = comb[j][k].every((x) => (temp >> (x - 1)) & 1);
      if (no) break;
    }
    if (no) break;
  }
  if (no) continue;
  ans++;
}
console.log(ans);
