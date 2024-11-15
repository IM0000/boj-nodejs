const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2836.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);

const R = [];

// 반대 방향으로 가는 구간을 필터링
input.forEach((item) => {
  let [x, y] = item.split(' ').map(Number);
  if (x > y) R.push([y, x]);
});

// 시작점 기준으로 정렬
R.sort((a, b) => a[0] - b[0]);

let totalDistance = m;
let mergedIntervals = [];

if (R.length > 0) {
  let [start, end] = R[0];

  for (let i = 1; i < R.length; i++) {
    let [s, e] = R[i];

    // 병합 가능한 경우
    if (s <= end) {
      end = Math.max(end, e);
    } else {
      mergedIntervals.push([start, end]);
      start = s;
      end = e;
    }
  }

  mergedIntervals.push([start, end]);

  // 병합된 구간으로 최종 이동 거리 계산
  mergedIntervals.forEach(([s, e]) => {
    totalDistance += 2 * (e - s);
  });
}

console.log(totalDistance);
