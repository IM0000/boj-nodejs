const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31416.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();

const answer = [];
for (let i = 0; i < N; i++) {
  const [ta, tb, va, vb] = input.shift().split(' ').map(Number);
  let A = ta * va;
  let B = tb * vb;
  let diff = A - B;

  if (diff <= 0) {
    answer.push(B);
  } else {
    let rr = va - Math.ceil(B / ta);

    let tmp = Math.ceil(rr / 2);
    if (rr % 2 == 1) {
      answer.push(B + tmp * ta);
    } else {
      answer.push(ta * (va - rr) + tmp * ta);
    }
  }
}
console.log(answer.join('\n'));
