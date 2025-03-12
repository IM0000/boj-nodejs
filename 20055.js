// 베이어 벨트 위의 로봇
const fs = require('fs');
const input = fs.readFileSync('20055.txt').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const belt = input[1].split(' ').map(Number);
const robots = Array(n).fill(false);
let step = 0;
let zeroCount = 0;

while (zeroCount < k) {
  step++;

  // 1. 벨트 회전
  const lastDurability = belt.pop();
  belt.unshift(lastDurability);
  const lastRobot = robots.pop();
  robots.unshift(false);
  robots[n - 1] = false; // 항상 내리는 위치의 로봇 제거

  // 2. 로봇 이동
  for (let i = n - 2; i >= 0; i--) {
    if (robots[i] && !robots[i + 1] && belt[i + 1] > 0) {
      robots[i] = false;
      robots[i + 1] = true;
      belt[i + 1]--;
      if (belt[i + 1] === 0) zeroCount++;
    }
  }
  robots[n - 1] = false; // 이동 후 내리는 위치의 로봇 제거

  // 3. 로봇 올리기
  if (belt[0] > 0 && !robots[0]) {
    // 로봇이 없는 경우에만 올리기
    robots[0] = true;
    belt[0]--;
    if (belt[0] === 0) zeroCount++;
  }

  // 4. 종료 조건 확인
  if (zeroCount >= k) {
    break;
  }
}

console.log(step);
