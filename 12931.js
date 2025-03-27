// 두 배 더하기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '12931.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const A = +input[0].trim();
let B = input[1].split(' ').map(Number);

let cnt = 0;
while (B.some((x) => x !== 0)) {
  if (B.every((x) => x % 2 === 0)) {
    cnt++;
    B = B.map((x) => x / 2);
  } else {
    let [cnt2, tmp] = makeEvenCount(B);
    B = tmp;
    cnt += cnt2;
  }
}
console.log(cnt);

function makeEvenCount(arr) {
  let cnt = 0;
  let tmpArr = [];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (num !== 0 && num % 2 != 0) {
      cnt++;
      num--;
    }
    tmpArr.push(num);
  }
  return [cnt, tmpArr];
}

function getMinCount(target) {
  const dp = Array(1001).fill(0);
  let add = 0;
  let multiple = 0;
  dp[0] = 0;
  for (let i = 1; i <= target; i++) {
    dp[i] = Math.min(dp[i - 1] + 1, i % 2 === 0 ? dp[i / 2] + 1 : Infinity);
  }

  return dp[target];
}
