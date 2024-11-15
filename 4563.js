// 리벤지 오브 피타고라스
// a2 = c2 - b2 = (c+b)(c-b)
// A<B<C
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4563.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// a2 = (c+b)(c-b) = x*y, b = (x-y)/2, b>a
const answer = [];
for (let i = 0; i < input.length; i++) {
  if (input[i].trim() === '0') break;
  let a = +input[i];
  let a2 = a * a;
  let cnt = 0;

  for (let j = 1; j <= a; j++) {
    let y = j;
    let x = a2 / y;
    if (x % 1 !== 0) {
      continue;
    }

    let b = (x - y) / 2;
    if (b > a && b % 1 === 0) {
      cnt++;
    }
  }

  answer.push(cnt);
}
console.log(answer.join('\n'));
