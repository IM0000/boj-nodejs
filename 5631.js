const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5631.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let caseNumber = 1;
let answer = [];

while (index < input.length) {
  const N = +input[index++].trim();
  if (N === 0) break;

  const houses = [];
  for (let i = 0; i < N; i++) {
    const [x, y] = input[index++].trim().split(' ').map(Number);
    houses.push([x, y]);
  }

  const [ax, ay, bx, by, q] = input[index++].trim().split(' ').map(Number);

  const queries = [];
  for (let i = 0; i < q; i++) {
    const [R1, R2] = input[index++].trim().split(' ').map(Number);
    queries.push([R1, R2]);
  }

  const distancesFromA = [];
  const distancesFromB = [];

  houses.forEach(([x, y]) => {
    const d1 = getDistanceSquared(x, y, ax, ay);
    distancesFromA.push(d1);

    const d2 = getDistanceSquared(x, y, bx, by);
    distancesFromB.push(d2);
  });

  distancesFromA.sort((a, b) => a - b);
  distancesFromB.sort((a, b) => a - b);

  answer.push(`Case ${caseNumber}:`);
  queries.forEach(([R1, R2]) => {
    const R1Squared = R1 * R1;
    const R2Squared = R2 * R2;

    const countA = upperBound(distancesFromA, R1Squared);
    const countB = upperBound(distancesFromB, R2Squared);

    let ans = N - countA - countB;
    if (ans < 0) ans = 0;

    answer.push(ans);
  });

  caseNumber++;
}

console.log(answer.join('\n'));

function getDistanceSquared(x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

function upperBound(arr, value) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] <= value) low = mid + 1;
    else high = mid;
  }
  return low;
}
