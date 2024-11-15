// 지금 자면 꿈을 꾸지만
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '32029.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, a, b] = input[0].split(' ').map(Number);
const tArr = input[1].split(' ').map(Number);
tArr.sort((a, b) => a - b);

// 0~a 시간 잠 반복
// 0~n 잘 위치 반복

// bx시간 자면 : a => a-x
// (0 ~ a) * b
let max = 0;
for (let i = 0; i < a; i++) {
  // 잠자는 시간
  let sleepTime = i * b;
  let reducedA = a - i;

  for (let j = 0; j < n; j++) {
    // 잠 자는 위치
    let curTime = 0;
    let answer = 0;
    // 잠자기 전에는 A, 잠 잔후에는 reducedA
    for (let k = 0; k < n; k++) {
      // answer 비교 후 증가
      if (k == j) {
        curTime += sleepTime;
      }

      if (k < j) {
        if (curTime + a > tArr[k]) continue;
        curTime += a;
      } else {
        if (curTime + reducedA > tArr[k]) continue;
        curTime += reducedA;
      }

      answer++;
    }
    max = Math.max(max, answer);
  }
}
console.log(max);
