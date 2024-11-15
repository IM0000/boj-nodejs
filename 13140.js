const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13140.txt';
const input = +fs.readFileSync(filePath).toString().trim();

const num = [];
const pick = Array(10).fill(false);

if (backtracking(0)) {
  console.log(printResult());
} else {
  console.log('No Answer');
}

function backtracking(depth) {
  if (depth == 7) {
    return isPossible();
  }

  for (let i = 0; i < 10; i++) {
    if (!pick[i]) {
      pick[i] = true;
      num[depth] = i;
      if (backtracking(depth + 1)) {
        return true;
      }
      pick[i] = false;
    }
  }
  return false;
}

function printResult() {
  const sumString = `${num[2]}${num[1]}${num[3]}${num[3]}${num[4]}`;
  const addString = `${num[6]}${num[4]}${num[5]}${num[3]}${num[0]}`;
  const targetString = String(input);
  const padding = ' '.repeat(7 - targetString.length);

  return `  ${sumString}\n+ ${addString}\n-------\n${padding}${targetString}`;
}

function isPossible() {
  if (num[2] == 0 || num[6] == 0) {
    return false;
  }

  return (
    num[0] +
      num[1] * 1000 +
      num[2] * 10000 +
      num[3] * 2 * 10 +
      num[3] * 100 +
      num[4] +
      num[4] * 1000 +
      num[5] * 100 +
      num[6] * 10000 ==
    input
  );
}
