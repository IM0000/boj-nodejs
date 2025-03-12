// 롤케이크
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? 0 : '16206.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// const [n, m] = input.shift().split(' ').map(Number);
// const arr = input[0].split(' ').map(Number);
// const cake10 = arr.filter((item) => item % 10 === 0 && item >= 10);
// cake10.sort((a, b) => a - b);
// const cakeNot10 = arr.filter((item) => item % 10 !== 0 && item >= 10);
// let cuttingCount = 0;
// let answer = 0;

// for (let i = 0; i < cake10.length && cuttingCount < m; i++) {
//   if (cake10[i] === 10) {
//     answer++;
//   } else {
//     if (cake10[i] === 20) {
//       cuttingCount++;
//       answer += 2;
//     } else if (cake10[i] / 10 <= m - cuttingCount) {
//       cuttingCount += cake10[i] / 10 - 1;
//       answer += cake10[i] / 10;
//     } else {
//       let cnt = m - cuttingCount;
//       cuttingCount += cnt;
//       answer += cnt;
//     }
//   }
// }

// for (let i = 0; i < cakeNot10.length && cuttingCount < m; i++) {
//   if (cakeNot10[i] / 10 <= m - cuttingCount) {
//     cuttingCount += Math.floor(cakeNot10[i] / 10);
//     answer += Math.floor(cakeNot10[i] / 10);
//   } else {
//     let cnt = m - cuttingCount;
//     cuttingCount += cnt;
//     answer += cnt;
//   }
// }
// console.log(answer);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  let [n, m] = input[0].split(' ').map(Number);
  let cakes = input[1].split(' ').map(Number);
  let v1 = [],
    v2 = [],
    num = 0;

  for (let a of cakes) {
    if (a < 10) continue;
    else if (a === 10) num++;
    else if (a % 10 === 0) v1.push(a);
    else v2.push(a);
  }

  v1.sort((a, b) => a - b);
  v2.sort((a, b) => a - b);
  v1 = [...v1, ...v2];

  while (m > 0 && v1.length > 0) {
    let tmp = v1.shift();
    let b = Math.floor(tmp / 10);

    if (tmp % 10 === 0) {
      if (b - 1 <= m) {
        num += b;
        m -= b - 1;
      } else {
        num += m;
        break;
      }
    } else {
      if (b <= m) {
        num += b;
        m -= b;
      } else {
        num += m;
        break;
      }
    }
  }

  console.log(num);
  process.exit();
});
