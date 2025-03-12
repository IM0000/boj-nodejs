// 벽장문의 이동
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2666.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const [a, b] = input[1].trim().split(' ').map(Number);
const k = +input[2].trim();
const arr = [];
for (let i = 3; i < 3 + k; i++) {
  arr.push(+input[i].trim());
}

const DP = Array.from({ length: k + 1 }, () =>
  Array.from({ length: n + 1 }, () => Array(n + 1).fill(9999999))
);
if (a > b) [a, b] = [b, a];
DP[0][a][b] = 0;

for (let i = 0; i < k; i++) {
  for (let currentA = 1; currentA <= n; currentA++) {
    for (let currentB = 1; currentB <= n; currentB++) {
      if (currentA === currentB) continue;
      if (DP[i][currentA][currentB] === 9999999) continue; // 도달하지 않은 상태

      const currentCost = DP[i][currentA][currentB];
      const req = arr[i];

      if (req === currentA || req === currentB) {
        // 요청된 벽장이 이미 열려 있는 경우, 이동 없이 다음으로 진행
        if (DP[i + 1][currentA][currentB] > currentCost) {
          DP[i + 1][currentA][currentB] = currentCost;
        }
      } else {
        // 두 가지 선택지: a를 이동하거나, b를 이동

        // 선택지 1: currentA를 req로 이동
        const cost1 = Math.abs(currentA - req);
        let newA1 = req;
        let newB1 = currentB;
        if (newA1 > newB1) [newA1, newB1] = [newB1, newA1]; // 정렬
        if (DP[i + 1][newA1][newB1] > currentCost + cost1) {
          DP[i + 1][newA1][newB1] = currentCost + cost1;
        }

        // 선택지 2: currentB를 req로 이동
        const cost2 = Math.abs(currentB - req);
        let newA2 = currentA;
        let newB2 = req;
        if (newA2 > newB2) [newA2, newB2] = [newB2, newA2]; // 정렬
        if (DP[i + 1][newA2][newB2] > currentCost + cost2) {
          DP[i + 1][newA2][newB2] = currentCost + cost2;
        }
      }
    }
  }
}

let minCost = 9999999;
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    minCost = Math.min(minCost, DP[k][i][j]);
  }
}
console.log(minCost);
