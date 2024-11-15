const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10713.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const p = input[index++].split(' ').map(Number); // 여행순서
const k = Array.from({ length: N }, () => 0n); // 방문횟수
const a = Array.from({ length: N }, () => undefined);
const b = Array.from({ length: N }, () => undefined);
const c = Array.from({ length: N }, () => undefined);

for (let i = 1; i < M; i++) {
  let cur = p[i - 1];
  let next = p[i];

  if (cur > next) {
    let tmp = cur;
    cur = next;
    next = tmp;
  }

  k[cur - 1] = k[cur - 1] + 1n;
  k[next - 1] = k[next - 1] - 1n;
}

for (let i = 1; i < N; i++) {
  k[i] = k[i] + k[i - 1];
}

for (let i = 0; i < N - 1; i++) {
  let price = input[index++].split(' ').map(Number);
  a[i] = BigInt(price[0]);
  b[i] = BigInt(price[1]);
  c[i] = BigInt(price[2]);
}

let ans = 0n;
for (let i = 0; i < N; i++) {
  if (k[i] === 0n) continue;
  if (a[i] * k[i] < b[i] * k[i] + c[i]) {
    ans += a[i] * k[i];
  } else {
    ans += b[i] * k[i] + c[i];
  }
}
console.log(Number(ans));
