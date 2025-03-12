// Summer Trip - 최적화된 기하학적 접근 방식의 Node.js 백준 제출용 코드
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2524.txt';

// 거리 계산 함수 (유클리드 거리)
function euclideanDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// 거리 계산 함수 (맨해튼 거리)
function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// 입력 처리
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);
const Ax = parseFloat(input[0]);
const Ay = parseFloat(input[1]);
const Bx = parseFloat(input[2]);
const By = parseFloat(input[3]);
const P = parseFloat(input[4]);
const Q = parseFloat(input[5]);
const R = parseFloat(input[6]);

// 표준 맨해튼 거리 계산
const standardDistance = manhattanDistance(Ax, Ay, Bx, By);

// 함수: 교차점 찾기
function findClosestIntersections(Ax, Ay, Bx, By, P, Q, R) {
  let minX = Math.min(Ax, Bx);
  let maxX = Math.max(Ax, Bx);
  let minY = Math.min(Ay, By);
  let maxY = Math.max(Ay, By);

  // A 지점에 대한 C1 후보들
  let minDistanceA = Infinity;
  let listC1 = [];

  // Avenues (x = Zx)
  if (Q !== 0) {
    const startZx = Math.floor(minX);
    const endZx = Math.ceil(maxX);
    for (let Zx = startZx; Zx <= endZx; Zx++) {
      const y = (R - P * Zx) / Q;
      if (y >= minY - 1e-9 && y <= maxY + 1e-9) {
        const distanceA = manhattanDistance(Ax, Ay, Zx, y);
        if (distanceA < minDistanceA - 1e-9) {
          minDistanceA = distanceA;
          listC1 = [{ x: Zx, y: y }];
        } else if (Math.abs(distanceA - minDistanceA) <= 1e-9) {
          listC1.push({ x: Zx, y: y });
        }
      }
    }
  }

  // Streets (y = Zy)
  if (P !== 0) {
    const startZy = Math.floor(minY);
    const endZy = Math.ceil(maxY);
    for (let Zy = startZy; Zy <= endZy; Zy++) {
      const x = (R - Q * Zy) / P;
      if (x >= minX - 1e-9 && x <= maxX + 1e-9) {
        const distanceA = manhattanDistance(Ax, Ay, x, Zy);
        if (distanceA < minDistanceA - 1e-9) {
          minDistanceA = distanceA;
          listC1 = [{ x: x, y: Zy }];
        } else if (Math.abs(distanceA - minDistanceA) <= 1e-9) {
          listC1.push({ x: x, y: Zy });
        }
      }
    }
  }

  // A 지점의 C1 리스트 반환
  return listC1;
}

// A에 대한 C1 리스트
const listC1 = findClosestIntersections(Ax, Ay, Bx, By, P, Q, R);

// B에 대한 C2 리스트
const listC2 = findClosestIntersections(Bx, By, Ax, Ay, P, Q, R);

// 브로드웨이를 통한 최소 거리 초기화
let viaBroadwayDistance = Infinity;

// 모든 C1과 C2 조합에 대해 거리 계산
for (let C1 of listC1) {
  for (let C2 of listC2) {
    // C1과 C2가 동일한 경우도 고려
    // 하지만 이 경우 브로드웨이를 통해 이동한 거리는 0이 됨
    const distanceAtoC1 = manhattanDistance(Ax, Ay, C1.x, C1.y);
    const distanceC1toC2 = euclideanDistance(C1.x, C1.y, C2.x, C2.y);
    const distanceC2toB = manhattanDistance(Bx, By, C2.x, C2.y);
    const totalDistance = distanceAtoC1 + distanceC1toC2 + distanceC2toB;
    if (totalDistance < viaBroadwayDistance - 1e-9) {
      viaBroadwayDistance = totalDistance;
    }
  }
}

// 최종 최소 거리: 표준 맨해튼 거리와 브로드웨이를 통한 거리 중 최소값
const minimalDistance = Math.min(standardDistance, viaBroadwayDistance);

// 출력 (소수점 이하 12자리까지)
console.log(minimalDistance.toFixed(12));
