const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5086.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const answer = [];
for (let i = 0; i < input.length; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  if (a === 0 && b === 0) break;
  answer.push(getAnswer(a, b));
}

console.log(answer.join('\n'));

function getAnswer(a, b) {
  if (a % b === 0) {
    return 'multiple';
  } else if (b % a === 0) {
    return 'factor';
  } else {
    return 'neither';
  }
}
