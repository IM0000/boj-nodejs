// 생물학자
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3116.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const bacteria = [];
for (let i = 1; i <= N; i++) {
  const [x, y, d] = input[i].trim().split(' ').map(Number);
  bacteria.push({ x, y, d });
}

// 방향 설정 (D=1~8)
const dx_map = [0, -1, 0, 1, 1, 1, 0, -1, -1];
const dy_map = [0, 1, 1, 1, 0, -1, -1, -1, 0];

// 이벤트 저장 (t, position)
const events = new Map();

// 함수: 두 박테리아가 만나는 시간을 계산
function getMeetTime(b1, b2) {
  const dx1 = dx_map[b1.d];
  const dy1 = dy_map[b1.d];
  const dx2 = dx_map[b2.d];
  const dy2 = dy_map[b2.d];

  const delta_dx = dx1 - dx2;
  const delta_dy = dy1 - dy2;
  const delta_x = b2.x - b1.x;
  const delta_y = b2.y - b1.y;

  // 같은 속도로 움직이는 경우
  if (delta_dx === 0 && delta_dy === 0) {
    return -1; // 만나지 않음
  }

  // delta_dx 또는 delta_dy가 0인 경우
  if (delta_dx === 0) {
    if (delta_x !== 0) return -1;
    if (delta_dy === 0) return -1;
    if (delta_y % delta_dy !== 0) return -1;
    const t = delta_y / delta_dy;
    if (t >= 1 && Number.isInteger(t)) {
      return t;
    }
    return -1;
  }

  if (delta_dy === 0) {
    if (delta_y !== 0) return -1;
    if (delta_dx === 0) return -1;
    if (delta_x % delta_dx !== 0) return -1;
    const t = delta_x / delta_dx;
    if (t >= 1 && Number.isInteger(t)) {
      return t;
    }
    return -1;
  }

  // 일반적인 경우
  if (delta_x % delta_dx !== 0 || delta_y % delta_dy !== 0) return -1;
  const t1 = delta_x / delta_dx;
  const t2 = delta_y / delta_dy;
  if (t1 !== t2) return -1;
  const t = t1;
  if (t >= 1 && Number.isInteger(t)) {
    return t;
  }
  return -1;
}

// 모든 박테리아 쌍에 대해 만나는 시간 계산
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const t = getMeetTime(bacteria[i], bacteria[j]);
    if (t === -1) continue;

    // t에 따른 위치 계산
    const x = bacteria[i].x + dx_map[bacteria[i].d] * t;
    const y = bacteria[i].y + dy_map[bacteria[i].d] * t;
    const pos = (x + 1000000) * 2000001 + (y + 1000000); // 좌표 인코딩
    // console.log(i, j, x, y);
    if (!events.has(t)) {
      events.set(t, new Map());
    }
    const posMap = events.get(t);
    posMap.set(pos, (posMap.get(pos) || 0) + 1);
  }
}

// 결과 계산
let maxCount = 2; // 최소 두 박테리아가 만나므로 2
let resultTime = Number.MAX_SAFE_INTEGER;

const sortedTimes = Array.from(events.keys()).sort((a, b) => a - b);

for (const t of sortedTimes) {
  const posMap = events.get(t);
  for (const k of posMap.values()) {
    const discriminant = 1 + 8 * k;
    const sqrtD = Math.sqrt(discriminant);
    if (sqrtD !== Math.floor(sqrtD)) continue; // n이 정수가 아니면 무시
    const n_bacteria = (1 + sqrtD) / 2;
    if (!Number.isInteger(n_bacteria)) continue;

    if (n_bacteria > maxCount) {
      maxCount = n_bacteria;
      resultTime = t;
    } else if (n_bacteria === maxCount && t < resultTime) {
      resultTime = t;
    }
  }
}

console.log(maxCount);
console.log(resultTime);

// // 입력: 박테리아 정보 2개
// // 출력: 만난다면 만나는 시간
// //  만나는 경우: 만나는 점이 정수
// //  만나지 않는 경우: 만나는 점이 소수이거나, 기울기가 동일한데 평행한 경우는
// function getMeetTime(B1, B2) {
//   const [a1, b1, c1] = getGraph(B1);
//   const [a2, b2, c2] = getGraph(B2);
//   const intersection = findIntersection(a1, b1, c1, a2, b2, c2);

//   if (intersection === -1) {
//     // 두 직선이 동일한 경우
//     if (
//       Math.abs(B1.d - B2.d) === 4 &&
//       (Math.abs(B1.x - B2.x) % 2 === 0 || Math.abs(B1.y - B2.y) === 0)
//     ) {
//       if (B1.d === 1 && B1.x < B2.x) {
//         return -1;
//       } else if (B1.d === 2 && B1.y > B2.y) {
//         return -1;
//       } else if (B1.d === 3 && B1.x > B2.x) {
//         return -1;
//       } else if (B1.d === 4 && B1.x > B2.x) {
//         return -1;
//       }

//       if (B1.d === 2) {
//         return Math.abs(B1.y - B2.y) / 2;
//       } else {
//         return Math.abs(B1.x - B2.x) / 2;
//       }
//     }
//   }

//   if (intersection === -2) {
//     // 두 직선이 평행한 경우
//     return -1; // 만나지 않음
//   }

//   // 교차하는 경우
//   if (intersection.x % 1 !== 0 || intersection.y % 1 !== 0) {
//     return -1;
//   }

//   // 교차하는 경우
// }

// // ax + by = c
// // return [a,b,c]
// function getGraph(b1) {
//   const d = b1.d;
//   if (d == 3 || d == 7) return [1, -1, b1.x - b1.y];
//   if (d == 1 || d == 5) return [1, 1, b1.x + b1.y];
//   if (d == 2 || d == 6) return [1, 0, b1.x];
//   if (d == 4 || d == 8) return [0, 1, b1.y];
// }

// function findIntersection(a, b, c, d, e, f) {
//   const determinant = a * e - b * d;

//   if (determinant === 0) {
//     if (a * f === c * d && b * f === e * c) {
//       return -1; //'두 직선은 동일합니다.';
//     } else {
//       return -2; //'두 직선은 평행합니다.';
//     }
//   }

//   const x = (c * e - b * f) / determinant;
//   const y = (a * f - d * c) / determinant;

//   return { x, y };
// }
