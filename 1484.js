// 다이어트
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1484.txt';
const G = +fs.readFileSync(filePath).toString().trim();

// A^2 - B^2 = G 가 나오는 A를 찾아라
// A = sqrt(G + B^2): 정수
// G:15 => 4^2 - 3^2 = 16 - 9 = 7
// 6^2 - 5^2 = 36 - 25 = 11
// 7^2 - 6^2 = 49 - 36 = 13
// 8^2 - 7^2 = 64 - 49 = 15
// 1000^2 = 1000000

const sqrtG = Math.ceil(Math.sqrt(G));
let answer = [];
for (let i = sqrtG; i <= 50000; i++) {
  if (Math.pow(i, 2) - Math.pow(i - 1, 2) > G) {
    break;
  }

  if (bs(i, G)) {
    answer.push(i);
  }
}

if (answer.length === 0) {
  console.log(-1);
} else {
  console.log(answer.join('\n'));
}

function bs(n, g) {
  let r = n - 1;
  let l = 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    let target = Math.pow(n, 2) - Math.pow(mid, 2);
    if (target === g) {
      return true;
    }

    if (target < g) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return false;
}
