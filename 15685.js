const fs = require('fs');
const { SourceTextModule } = require('vm');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15685.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift().trim();
const board = Array.from({ length: 101 }, () => Array(101).fill(0));
// board[y][x]
const dx = [1, 0, -1, 0];
const dy = [0, -1, 0, 1];

for (let i = 0; i < N; i++) {
  const [x, y, d, g] = input[i].trim().split(' ').map(Number);
  makeDragonCurve(x, y, d, g);
}

console.log(getSquare());

function makeDragonCurve(ix, iy, id, g) {
  const stack = [];
  stack.push(id);
  let cx = ix;
  let cy = iy;
  board[cy][cx] = 1;

  while (g--) {
    const temp = [...stack];

    while (temp.length) {
      const pop = temp.pop();
      const dir = (pop + 1) % 4;
      stack.push(dir);
    }
  }

  for (let i = 0; i < stack.length; i++) {
    const dir = stack[i];
    cx += dx[dir];
    cy += dy[dir];
    board[cy][cx] = 1;
  }
}

function getSquare() {
  let count = 0;

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      if (
        board[y][x] &&
        board[y + 1][x] &&
        board[y][x + 1] &&
        board[y + 1][x + 1]
      ) {
        count++;
      }
    }
  }

  return count;
}
