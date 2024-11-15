const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2992.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let num = input[0].trim();
let upperMin = 9999990;
let visited = Array(num.length).fill(false);

function bt(start, numStr) {
  if (start === num.length) {
    if (+numStr > +num) {
      upperMin = Math.min(upperMin, Number(numStr));
    }
    return;
  }

  for (let i = 0; i < num.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      bt(start + 1, numStr + num[i]);
      visited[i] = false;
    }
  }
}

bt(0, '');
console.log(upperMin === 9999990 ? 0 : upperMin);
