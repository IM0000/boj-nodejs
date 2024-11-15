// 상근이의 로봇
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2819.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);

const xMap = new Map();
const yMap = new Map();
let 상 = 0;
let 하 = 0;
let 좌 = 0;
let 우 = 0;

let 저장 = {
  상: 0,
  하: 0,
  좌: 0,
  우: 0,
};

for (let i = 1; i <= n; i++) {
  let [x, y] = input[i].split(' ').map(Number);
  xMap.set(x, (xMap.get(x) || 0) + 1);
  yMap.set(y, (yMap.get(y) || 0) + 1);

  // 저장
  if (x > 0) {
    저장.우 += Math.abs(x);
    우++;
  } else if (x < 0) {
    저장.좌 += Math.abs(x);
    좌++;
  }
  if (y > 0) {
    저장.상 += Math.abs(y);
    상++;
  } else if (y < 0) {
    저장.하 += Math.abs(y);
    하++;
  }
}

const answer = [];
const commands = input[n + 1];
let robotX = 0;
let robotY = 0;
for (let i = 0; i < commands.length; i++) {
  const command = commands[i];

  if (command === 'S') {
    // 상
    저장.하 += 하;
    저장.하 += yMap.get(robotY) || 0;
    하 += yMap.get(robotY) || 0;
    robotY += 1;
    저장.상 -= 상;
    상 -= yMap.get(robotY) || 0;
    answer.push(getSum(저장));
  } else if (command === 'J') {
    // 하
    저장.상 += 상;
    저장.상 += yMap.get(robotY) || 0;
    상 += yMap.get(robotY) || 0;
    robotY -= 1;
    저장.하 -= 하;
    하 -= yMap.get(robotY) || 0;
    answer.push(getSum(저장));
  } else if (command === 'Z') {
    // 좌
    저장.우 += 우;
    저장.우 += xMap.get(robotX) || 0;
    우 += xMap.get(robotX) || 0;
    robotX -= 1;
    저장.좌 -= 좌;
    좌 -= xMap.get(robotX) || 0;
    answer.push(getSum(저장));
  } else if (command === 'I') {
    // 우
    저장.좌 += 좌;
    저장.좌 += xMap.get(robotX) || 0;
    좌 += xMap.get(robotX) || 0;
    robotX += 1;
    저장.우 -= 우;
    우 -= xMap.get(robotX) || 0;
    answer.push(getSum(저장));
  }
}
console.log(answer.join('\n'));

// S(north)는 (x, y+1)로, J(south)는 (x,y-1)로,
// I(east)는 (x+1,y)로, Z(west)는 (x-1,y)
// 0,0 시작
// -1000000 <= x,y <= 1000000

function getSum(map) {
  let sum = 0;
  for (let key in map) {
    sum += map[key];
  }
  return sum;
}
