const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1182.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, s] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

let answer = 0;
function dfs(depth, sum, cnt) {
  if (depth === n) {
    if (sum === s && cnt !== 0) {
      answer++;
    }
    return;
  }
  dfs(depth + 1, sum, cnt);
  dfs(depth + 1, sum + numbers[depth], cnt + 1);
}
dfs(0, 0, 0);
console.log(answer);
