const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '25343.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input.shift().trim();
const arr = input.map((line) => line.split(' ').map(Number));

const INF = Infinity;

// 두 DP 상태를 길이별로 merge (없는 항목은 INF 취급)
function mergeState(state1, state2) {
  const len = Math.max(state1.length, state2.length);
  const res = [];
  for (let i = 0; i < len; i++) {
    const a = i < state1.length ? state1[i] : INF;
    const b = i < state2.length ? state2[i] : INF;
    res.push(Math.min(a, b));
  }
  return res;
}

// dp 상태(state)는 이미 정렬된 배열 (index 0:빈수열, index>=1: 마지막 원소)
// x를 처리한 후의 상태를 리턴
function updateState(state, x) {
  const newState = state.slice();
  // lower_bound: newState에서 처음으로 newState[i] >= x인 i를 찾습니다.
  let lo = 0,
    hi = newState.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (newState[mid] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  if (lo === newState.length) {
    newState.push(x);
  } else {
    newState[lo] = x;
  }
  return newState;
}

// dp[i][j] : (0,0)부터 (i,j)까지의 경로에 대해 만든 dp 상태
const dp = Array.from({ length: n }, () => Array(n).fill(null));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i === 0 && j === 0) {
      // 시작점: 빈 상태 [0] 에서 arr[0][0]를 넣음
      dp[0][0] = updateState([0], arr[0][0]);
    } else {
      let merged;
      if (i > 0 && j > 0) {
        merged = mergeState(dp[i - 1][j], dp[i][j - 1]);
      } else if (i > 0) {
        merged = dp[i - 1][j].slice();
      } else {
        // j > 0
        merged = dp[i][j - 1].slice();
      }
      dp[i][j] = updateState(merged, arr[i][j]);
    }
  }
}

// dp[n-1][n-1].length - 1: index0은 빈 수열이므로 빼줍니다.
const answer = dp[n - 1][n - 1].length - 1;
console.log(answer);

let s = [1, 2, 3, 4, 5];
console.log(s.slice());
