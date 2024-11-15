const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15655.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const answer = [];
const dfs = (depth, start, temp = []) => {
  if (depth === M) {
    answer.push(temp.join(' '));
    return;
  }

  for (let i = start; i < N; i++) {
    temp.push(numbers[i]);
    dfs(depth + 1, i + 1, temp);
    temp.pop();
  }
};

dfs(0, 0, []);
console.log(answer.join('\n'));
