const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1644.txt';
const n = +fs.readFileSync(filePath).toString().trim();

const prime = [false, false, true];
let sum = [0];
for (let i = 3; i <= n; i++) {
  prime[i] = true;
}
for (let i = 2; i <= n; i++) {
  if (prime[i]) {
    for (let j = i * i; j <= n; j += i) {
      prime[j] = false;
    }
    sum.push(sum[sum.length - 1] + i);
  }
}


let cnt = 0;
let left = 0;
let right = 1;

while (right < sum.length) {
  let temp = sum[right] - sum[left];

  if(temp < n) {
    right++;
  } else if(temp > n) {
    left++;
  } else {
    right++;
    left++;
    cnt++;
  }
}

console.log(cnt);