// 소가 길을 건너간 이유 4
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14464.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [c, n] = input[idx++].split(' ').map(Number);
const tArr = [];
const cowArr = [];

for (let i = 0; i < c; i++) {
  tArr.push(+input[idx++]);
}
tArr.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  cowArr.push(input[idx++].split(' ').map(Number));
}

cowArr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let answer = 0;
const visited = Array.from(cowArr, () => false);

for (let i = 0; i < tArr.length; i++) {
  let time = tArr[i];
  for (let j = 0; j < cowArr.length; j++) {
    if (visited[j]) continue;
    const [st, en] = cowArr[j];
    if (st <= time && time <= en) {
      answer++;
      visited[j] = true;
      break;
    }
  }
}

console.log(answer);
