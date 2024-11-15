const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7507.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();
let answer = [];
let test = 1;
while (T--) {
  let m = +input[index++].trim();

  let data = [];
  for (let i = 0; i < m; i++) {
    let [d, s, e] = input[index++].trim().split(' ');
    data.push([d, s, e]);
  }

  data.sort((a, b) => {
    if (a[0] == b[0]) return a[2] - b[2];
    return a[0] - b[0];
  });

  answer.push(`Scenario #${test++}:`);
  let cnt = 1;
  let prev = data[0];
  for (let i = 1; i < m; i++) {
    let curr = data[i];
    if (prev[0] == curr[0]) {
      if (curr[1] < prev[2]) {
        continue;
      } else {
        cnt++;
        prev = curr;
      }
    } else {
      cnt++;
      prev = curr;
    }
  }
  answer.push(cnt);
  answer.push('');
}

console.log(answer.join('\n').trim());
