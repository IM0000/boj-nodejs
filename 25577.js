const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '25577.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .split('\n')
  .map((v) => v.trim());

const n = +input[0];
const arr = input[1].split(' ').map((v, i) => {
  return { value: v, index: i };
});
arr.sort((a, b) => {
  return a.value - b.value;
});

let visited = new Array(n).fill(false);
let answer = 0;
for (let i = 0; i < n; i++) {
  if (visited[i] || arr[i].index === i) {
    continue;
  }

  let j = i;
  let cnt = 0;

  while (!visited[j]) {
    visited[j] = true;
    j = arr[j].index;
    cnt++;
  }
  answer += cnt - 1; // 사이클의 원소수 - 1 == 이동횟수
}

console.log(answer);
