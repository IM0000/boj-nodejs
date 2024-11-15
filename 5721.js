const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5721.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const getMaxSum = (arr) => {
  let dp = Array(arr.length).fill(0);
  dp[0] = arr[0];
  dp[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
  }

  return dp[arr.length - 1];
};

const getBoardSum = (board) => {
  let dpArr = Array(board.length).fill(0);
  for (let i = 0; i < board.length; i++) {
    dpArr[i] = getMaxSum(board[i]);
  }

  let sum = getMaxSum(dpArr);

  return sum;
};

let index = 0;
let answer = [];
while (true) {
  let [M, N] = input[index++].split(' ').map(Number);

  if (N === 0 && M === 0) break;

  const board = [];
  let max = 0;

  for (let i = 0; i < M; i++) {
    board.push(input[index++].split(' ').map(Number));
  }

  let ans = getBoardSum(board);
  answer.push(ans);
}

console.log(answer.join('\n'));
// let arr = [1, 8, 2, 1, 9];
// getMaxSum(arr);

// 짝수 / 홀수
// o x x o x ...
// o x o x o ...
// x o x o x ...
// x o x x o ...

// 1 8 2 1 9
// 1 8 8 9 17

// 1 7 3 5 2
// 1 7 7 12 12

// 1 2 10 3 10
// 1 2 11 11

// dp[n] = Math.max(dp[n - 1], dp[n - 2] + arr[n]);
