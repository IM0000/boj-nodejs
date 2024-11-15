const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7344.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let T = +input[0].trim();
let i = 1;
const answer = [];

while (T-- > 0) {
  const stick = [];
  let n = +input[i++].trim();
  const numbers = input[i++].trim().split(/\s+/).map(Number);

  for (let j = 0; j < 2 * n; j += 2) {
    stick.push([[numbers[j], numbers[j + 1]], false]);
  }

  stick.sort((a, b) => a[0][0] - b[0][0]);
  let time = 0;

  for (let i = 0; i < stick.length; i++) {
    if (stick[i][1] === false) {
      stick[i][1] = true;
      time += 1;
      let preIndex = i;
      for (let j = i + 1; j < stick.length; j++) {
        if (stick[j][1] === false && stick[preIndex][0][1] <= stick[j][0][1]) {
          stick[j][1] = true;
          preIndex = j;
        }
      }
    }
  }

  answer.push(time);
}
console.log(answer.join('\n'));
