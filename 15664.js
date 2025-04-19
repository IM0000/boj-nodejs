// N과 M (10)
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15664.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].trim().split(' ').map(Number);
const nArr = input[1].trim().split(' ').map(Number);
nArr.sort((a, b) => a - b);
const answerSet = new Set();
bt(0, 0, []);
console.log([...answerSet].join('\n'));

function bt(depth, index, arr) {
  if (depth === m) {
    answerSet.add(arr.join(' '));
    return;
  }

  let temp = [...arr];

  for (let i = index; i < nArr.length; i++) {
    temp.push(nArr[i]);
    bt(depth + 1, i + 1, [...temp]);
    temp.pop();
  }
}
