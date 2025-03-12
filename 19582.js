// 200년간 폐관수련했더니 PS 최강자가 된 건에 대하여
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '19582.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(input[i].trim().split(' ').map(Number));
}

// 1. 현재까지 모든 대회 참가하고 상금합이 x보다 작은 경우
//  - 현재가 마지막 대회라면 Kkeo-eok 출력하고 종료
//  - 아니라면 참가

// 2. 올참가, 총 상금이 x보다 크고
//  - Max인 것 불참처리 후 참가

// 3. 총 상금이 x보다 크고, 하나 불참한 상태라면
//  - Zzz 출력

let sum = 0;
let max = 0;
let chance = false;
let answer = 'Kkeo-eok';
for (let i = 0; i < arr.length; i++) {
  const [x, p] = arr[i];
  if (i === arr.length - 1 && (sum <= x || !chance)) {
    break;
  }
  if (sum <= x) {
    sum += p;
  } else if (sum > x) {
    if (!chance) {
      if (p <= max && sum - max <= x) {
        sum -= max;
        sum += p;
      }
      chance = true;
    } else {
      answer = 'Zzz';
      break;
    }
  }

  if (p > max) max = p;
}

console.log(answer);
