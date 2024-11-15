const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '27967.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');
const N = Number(input[0]);
let str = input[1].split('');
dfs(0, str);

function isRight(parens) {
  let balance = 0;
  for (let char of parens) {
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
    }
    if (balance < 0) {
      return false;
    }
  }
  return balance == 0;
}

function dfs(i, current) {
  if (i === N) {
    if (isRight(current)) {
      console.log(current.join(''));
      process.exit(0);
    }
    return;
  }

  if (current[i] == 'G') {
    current[i] = '(';
    dfs(i + 1, current);
    current[i] = ')';
    dfs(i + 1, current);
    current[i] = 'G';
  } else {
    dfs(i + 1, current);
  }
}
