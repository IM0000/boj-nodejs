const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1551.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [N, K] = input.shift().split(' ').map(Number);
const arr = input.shift().split(',').map(Number);

const makeNext = (arr, k) => {
  if (k == 0) {
    return arr;
  }
  let nArr = [];
  for (let i = 1; i < arr.length; i++) {
    let tmp = arr[i] - arr[i - 1];
    nArr.push(tmp);
  }

  return makeNext(nArr, k - 1);
};

const nArr = makeNext(arr, K);
console.log(nArr.join(','));
