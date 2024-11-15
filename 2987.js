// 사과나무
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2987.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let [x1, y1] = input[0].split(' ').map(Number);
let [x2, y2] = input[1].split(' ').map(Number);
let [x3, y3] = input[2].split(' ').map(Number);
let n = +input[3].trim();
const arr = [];
for (let i = 4; i < 4 + n; i++) {
  arr.push(input[i].trim().split(' ').map(Number));
}
let area = parseFloat(
  Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
).toFixed(1);

let cnt = 0;
for (let i = 0; i < arr.length; i++) {
  if (isPointInTriangle(arr[i][0], arr[i][1])) {
    cnt++;
  }
}
console.log(`${area}\n${cnt}`);

function isPointInTriangle(px, py) {
  const areaOrig = Math.abs(
    (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
  );

  const area1 = Math.abs(
    (px * (y2 - y3) + x2 * (y3 - py) + x3 * (py - y2)) / 2
  );
  const area2 = Math.abs(
    (x1 * (py - y3) + px * (y3 - y1) + x3 * (y1 - py)) / 2
  );
  const area3 = Math.abs(
    (x1 * (y2 - py) + x2 * (py - y1) + px * (y1 - y2)) / 2
  );

  const epsilon = 1e-9;
  return Math.abs(area1 + area2 + area3 - areaOrig) < epsilon;
}

// function inspect(x, y) {
//   let crossCnt = 0;
//   let grad1, grad2, grad3;
//   let hor1 = y2 == y1 ? true : false;
//   let ver1 = x2 == x1 ? true : false;
//   if ((y2 <= y && y <= y1) || (y1 <= y && y <= y2)) {
//     if (!hor1 && !ver1) {
//       grad1 = (y2 - y1) / (x2 - x1);
//       let xCross = (y + grad1 * x1 - y1) / grad1;
//       if (xCross == x) {
//         return true;
//       }
//       if (xCross > x) crossCnt++;
//     } else if (ver1) {
//       if (x == x1) {
//         return true;
//       }
//       if (x < x1) crossCnt++;
//     } else if (hor1) {
//       if (y == y1) {
//         crossCnt++;
//         return true;
//       }
//     }
//   }

//   let hor2 = y3 == y2 ? true : false;
//   let ver2 = x3 == x2 ? true : false;
//   if ((y2 <= y && y <= y3) || (y3 <= y && y <= y2)) {
//     if (!hor2 && !ver2) {
//       grad2 = (y3 - y2) / (x3 - x2);
//       let xCross = (y + grad2 * x2 - y2) / grad2;
//       if (xCross == x) {
//         return true;
//       }
//       if (xCross > x) crossCnt++;
//     } else if (ver2) {
//       if (x == x2) {
//         return true;
//       }
//       if (x < x2) crossCnt++;
//     } else if (hor2) {
//       if (y == y2) {
//         crossCnt++;
//         return true;
//       }
//     }
//   }

//   let hor3 = y1 == y3 ? true : false;
//   let ver3 = x1 == x3 ? true : false;
//   if ((y1 <= y && y <= y3) || (y3 <= y && y <= y1)) {
//     if (!hor3 && !ver3) {
//       grad3 = (y1 - y3) / (x1 - x3);
//       let xCross = (y + grad3 * x3 - y3) / grad3;
//       if (xCross == x) {
//         return true;
//       }
//       if (xCross > x) crossCnt++;
//     } else if (ver3) {
//       if (x == x3) {
//         return true;
//       }
//       if (x < x3) crossCnt++;
//     } else if (hor3) {
//       if (y == y3) {
//         crossCnt++;
//         return true;
//       }
//     }
//   }
//   return crossCnt % 2 == 1 ? true : false;
// }
