// 장난감 경주
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '19592.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let T = +input[0].trim();
let index = 1;
const answer = [];
while (T-- > 0) {
  const [n, x, y] = input[index++].split(' ').map(Number);
  const vArr = input[index++].split(' ').map(Number);
  let lastIndex = n - 1;
  let ans;

  let maxIndex = getIndexOfMax(vArr);
  if (maxIndex === lastIndex) {
    ans = 0;
  } else {
    let maxV = vArr[maxIndex];
    let minS = x / maxV;

    let minY = x - vArr[lastIndex] * (minS - 1);
    if (minY < y) {
      ans = Math.ceil(minY);
      if (minY == ans) {
        ans++;
      }
    } else {
      ans = -1;
    }
  }

  answer.push(ans);
}

console.log(answer.join('\n'));

function getIndexOfMax(arr) {
  let max = Number.MIN_SAFE_INTEGER;
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      index = i;
      max = arr[i];
    }
  }
  return index;
}
