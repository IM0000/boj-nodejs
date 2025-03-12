// 예쁜수
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '25958.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [m, k] = input[0].split(' ').map(Number);

// dp[m] = m이하 예쁜수로 m을 만드는 경우의수
let prettyNumbers = getPrettyNumbers(m);
const dp = Array(m + 1).fill(0);
dp[0] = 1;

for (let num of prettyNumbers) {
  for (let i = num; i <= m; i++) {
    dp[i] = (dp[i] + dp[i - num]) % k;
  }
}
console.log(dp[m]);

function getPrettyNumbers(m) {
  let numbers = [];
  for (let i = 1; i <= m; i++) {
    let S = i
      .toString()
      .split('')
      .reduce((p, i) => {
        return p + Number(i);
      }, 0);
    if (i % S === 0) {
      numbers.push(i);
    }
  }
  return numbers;
}

//0 | 0
//1 | 1
//2 | 11 2
//3 | 111 12 3
//4 | 1111 112 22 13 4
