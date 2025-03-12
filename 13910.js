// 개업
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '13910.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const wok = {};

for (let i = 0; i < arr.length; i++) {
  let singleSize = arr[i];
  if (!wok[singleSize]) {
    wok[singleSize] = true;
  }
  for (let j = i + 1; j < arr.length; j++) {
    let doubleSize = arr[i] + arr[j];
    if (!wok[doubleSize] && doubleSize <= n) {
      wok[doubleSize] = true;
    }
  }
}
const possible = Object.keys(wok).map(Number);
const dp = Array(n + 1).fill(Infinity);
dp[0] = 0;

for (let i = 0; i <= n; i++) {
  for (let j = 0; j < possible.length; j++) {
    let wokSize = possible[j];
    if (i + wokSize <= n && dp[i] !== Infinity) {
      dp[i + wokSize] = Math.min(dp[i + wokSize], dp[i] + 1);
    }
  }
}

let answer = -1;
if (dp[n] !== Infinity) {
  answer = dp[n];
}
console.log(answer);
