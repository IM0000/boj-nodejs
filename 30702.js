const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30702.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M] = input[index++].split(' ').map(Number);

const A = [];
const B = [];

for (let i = 0; i < 2 * N; i++) {
  if (i < N) A.push(input[index++].split(''));
  else B.push(input[index++].split(''));
}

let visited = Array.from({ length: N }, () => Array(M).fill(false));
let stack = [];
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let ans = 'YES';
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j]) {
      let letter = A[i][j];
      let queue = [[i, j]];
      visited[i][j] = true;
      stack.push([i, j]);

      while (queue.length) {
        let [x, y] = queue.shift();

        for (let k = 0; k < 4; k++) {
          let nx = x + dx[k];
          let ny = y + dy[k];

          if (
            nx >= 0 &&
            nx < N &&
            ny >= 0 &&
            ny < M &&
            !visited[nx][ny] &&
            A[nx][ny] === letter
          ) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
            stack.push([nx, ny]);
          }
        }
      }
    }

    let cx, cy;
    if (stack.length) [cx, cy] = stack.pop();
    while (stack.length) {
      let [nx, ny] = stack.pop();
      if (B[cx][cy] !== B[nx][ny]) {
        ans = 'NO';
        break;
      }
    }
  }
}
console.log(ans);
