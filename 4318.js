// A flea on a chessboard
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4318.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const answer = [];
while (true) {
  let str = input[idx++].trim();
  if (str == '0 0 0 0 0') {
    break;
  }
  let [S, x, y, dx, dy] = str.split(' ').map(Number);

  const initialCol = Math.floor(x / S);
  const initialRow = Math.floor(y / S);
  const initPosSum = initialCol + initialRow;
  const onBoundary = x % S === 0 || y % S === 0;

  if (initPosSum % 2 === 1 && !onBoundary) {
    // 흰색
    answer.push(
      `After 0 jumps the flea lands at (${Math.floor(x)}, ${Math.floor(y)}).`
    );
    continue;
  }

  // 검정
  const jumpPeriodX = S / gcd(dx, S);
  const jumpPeriodY = S / gcd(dy, S);
  const maxCnt = 2 * lcm(jumpPeriodX, jumpPeriodY);
  let cnt = 0;
  let white = false;
  while (++cnt <= maxCnt) {
    x += dx;
    y += dy;
    if (x % S === 0 || y % S === 0) {
      continue;
    }

    let posSum = Math.floor(x / S) + Math.floor(y / S);
    if (posSum % 2 === 1) {
      answer.push(
        `After ${cnt} jumps the flea lands at (${Math.floor(x)}, ${Math.floor(
          y
        )}).`
      );
      white = true;
      break;
    }
  }

  if (!white) {
    answer.push('The flea cannot escape from black squares.');
  }
}
console.log(answer.join('\n'));

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
