const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17281.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

let answer = 0;
let order = Array.from({ length: 9 }, (_, i) => i);

function calc() {
  let score = 0;
  let out = 0;
  let base1 = 0;
  let base2 = 0;
  let base3 = 0;
  let num = 0;
  for (let i = 0; i < N; i++) {
    while (true) {
      let hit = arr[i][order[num]];
      num = (num + 1) % 9;
      if (hit === 0) {
        out++;
      } else {
        if (hit == 1) {
          score += base3;
          base3 = base2;
          base2 = base1;
          base1 = 1;
        } else if (hit == 2) {
          score += base3 + base2;
          base3 = base1;
          base2 = 1;
          base1 = 0;
        } else if (hit == 3) {
          score += base3 + base2 + base1;
          base3 = 1;
          base2 = 0;
          base1 = 0;
        } else if (hit == 4) {
          score += base3 + base2 + base1 + 1;
          base3 = 0;
          base2 = 0;
          base1 = 0;
        }
      }
      if (out === 3) {
        out = 0;
        base1 = base2 = base3 = 0;
        break;
      }
    }
  }
  return score;
}

function dfs(depth) {
  if (depth === 9) {
    if (order[3] !== 0) {
      return;
    }
    answer = Math.max(answer, calc());
    return;
  }

  for (let i = depth; i < 9; i++) {
    var temp = order[i];
    order[i] = order[depth];
    order[depth] = temp;
    console.log(order.toString());
    dfs(depth + 1);
    temp = order[i];
    order[i] = order[depth];
    order[depth] = temp;
  }
}

dfs(0);
console.log(answer);
