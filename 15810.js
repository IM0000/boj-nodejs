const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15810.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

const binarySearch = () => {
  let left = 1;
  let right = Math.max(...A) * M;
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;

    for (let i = 0; i < N; i++) {
      count += Math.floor(mid / A[i]);
    }

    if (count >= M) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
};

let res = binarySearch();
console.log(res);
