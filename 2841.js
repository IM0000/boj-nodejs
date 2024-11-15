const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2841.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

const stacks = Array.from({ length: 6 }, () => []);
let cnt = 0;
for (let i = 0; i < N; i++) {
  const [line, pret] = input[i + 1].split(' ').map(Number);

  if (stacks[line - 1].length === 0 || pret > stacks[line - 1].at(-1)) {
    stacks[line - 1].push(pret);
    cnt++;
    continue;
  } else if (pret === stacks[line - 1].at(-1)) {
    continue;
  } else if (pret < stacks[line - 1].at(-1)) {
    while (stacks[line - 1].length && pret < stacks[line - 1].at(-1)) {
      stacks[line - 1].pop();
      cnt++;
    }
    if (stacks[line - 1].length === 0 || pret > stacks[line - 1].at(-1)) {
      stacks[line - 1].push(pret);
      cnt++;
    }
  }
}
// 1 3 5 7 3 1

console.log(cnt);
