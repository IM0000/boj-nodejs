// // 은나무
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '26216.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');

// let index = 0;
// // K: 흰색 노드가 가질 수 있는 파란 노드
// // H: 트리 높이
// const [K, H, Q] = input[index++].split(' ').map(Number);
// // console.log('🚀 ~ file: 26216.js:10 ~ K, H,:', K, H);
// const blueNodesCount = getBlueCount(K, H);

// const heights = Array(blueNodesCount + 1).fill(-1);
// getHeight(K, H);
// // console.log('🚀 ~ file: 26216.js:13 ~ heights:', heights);

// let answer = [];
// for (let i = 0; i < Q; i++) {
//   let [A, B] = input[index++].split(' ').map(Number);
//   answer.push(solve(A, B, K, H));
// }
// console.log(answer.join('\n'));

// function solve(a, b, k, h) {
//   if (!heights[a] || !heights[b] || heights[a] == -1 || heights[b] == -1) {
//     return -1;
//   }

//   let cnt = 0;
//   h--;
//   let base = Math.pow(k + 1, h);
//   while (base != 1) {
//     h--;
//     let temp = 0;
//     for (let i = base; i <= blueNodesCount + 1; i += base) {
//       if (a === i || b === i) {
//         return heights[a] + heights[b] - 2 * cnt;
//       }

//       if (temp < a && a < i && temp < b && b < i) {
//         cnt++;
//       }

//       temp = i;
//     }
//     base = Math.pow(k + 1, h);
//   }

//   return heights[a] + heights[b] - 2 * cnt;
// }

// function getHeight(k, h) {
//   let height = 1;
//   while (h--) {
//     let idx = Math.pow(k + 1, h);
//     for (let i = idx; i <= blueNodesCount; i += idx) {
//       if (heights[i] === -1) {
//         heights[i] = height;
//       }
//     }
//     height++;
//   }
// }

// function getBlueCount(k, h) {
//   let cnt = 0;
//   for (let i = 0; i < h; i++) {
//     cnt += k * Math.pow(k + 1, i);
//   }
//   return cnt;
// }

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '26216.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [K, H, Q] = input[index++].split(' ').map(Number);
const maxNode = Math.pow(K + 1, H) - 1;

function getWhiteParent(A, K) {
  let d = 0;
  let node = A;

  // A를 (K + 1)진법으로 나타냈을 때 0이 아닌 최하위 자릿수의 위치를 찾는다.
  while (node % (K + 1) === 0) {
    node = Math.floor(node / (K + 1));
    d++;
  }

  // 흰색 부모 노드의 번호를 계산
  let v = Math.floor(A / Math.pow(K + 1, d + 1));
  return { depth: H - 1 - d, value: v };
}

function solve(A, B) {
  if (A > maxNode || B > maxNode || A < 1 || B < 1) return -1;
  if (A === B) return 0;

  const whiteA = getWhiteParent(A, K);
  // console.log('🚀 ~ file: 26216.js:102 ~ solve ~ whiteA:', A, whiteA);
  const whiteB = getWhiteParent(B, K);
  // console.log('🚀 ~ file: 26216.js:102 ~ solve ~ whiteA:', B, whiteB);

  // 흰색 노드 간의 최소 공통 조상을 찾고 거리 계산
  let distance = 0;
  while (whiteA.depth !== whiteB.depth) {
    if (whiteA.depth > whiteB.depth) {
      whiteA.value = Math.floor(whiteA.value / (K + 1));
      whiteA.depth--;
    } else {
      whiteB.value = Math.floor(whiteB.value / (K + 1));
      whiteB.depth--;
    }
    distance++;
  }

  while (whiteA.value !== whiteB.value) {
    whiteA.value = Math.floor(whiteA.value / (K + 1));
    whiteB.value = Math.floor(whiteB.value / (K + 1));
    distance += 2;
  }

  return distance + 2; // 흰색 노드간의 거리 + 두 파란색 노드까지의 거리(2)
}

let answer = [];
for (let i = 0; i < Q; i++) {
  let [A, B] = input[index++].split(' ').map(Number);
  answer.push(solve(A, B));
}
console.log(answer.join('\n'));
