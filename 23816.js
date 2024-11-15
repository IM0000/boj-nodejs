const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23816.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');
const [N, M] = input.map(Number);
console.log('🚀 ~ file: 23816.js:5 ~ [N, M]:', [N, M]);

// const h = Array(5)
//   .fill(0)
//   .map((_, i) => {
//     if (i > 0) return 2 ** (i - 1);
//     return 0;
//   });
// h[4] = 0;
// console.log('🚀 ~ file: 23816.js:8 ~ h:', h);

// const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(-1));

// for (let i = 0; i < 5 && 2 ** i - 1 <= M; i++) {
//   dp[1][2 ** i] = h[i];
// }

// dp[0][0] = 0;
// for (let i = 1; i <= N; i++) {
//   dp[i][1] = 1;
//   dp[i][0] = 0;
// }

// for (let i = 2; i <= N; i++) {
//   for (let j = 2; j <= M; j++) {
//     if (i >= j) {
//       dp[i][j] = j;
//     } else {
//       if (j > 15) {
//         dp[i][j] = Math.max(
//           dp[i][j] + h[0],
//           dp[i - 1][j - 1] + h[1],
//           dp[i - 1][j - 3] + h[2],
//           dp[i - 1][j - 7] + h[3],
//           dp[i - 1][j - 15] + h[4]
//         );
//       } else if (j > 7) {
//         dp[i][j] = Math.max(
//           dp[i][j] + h[0],
//           dp[i - 1][j - 1] + h[1],
//           dp[i - 1][j - 3] + h[2],
//           dp[i - 1][j - 7] + h[3]
//         );
//       } else if (j > 3) {
//         dp[i][j] = Math.max(
//           dp[i][j] + h[0],
//           dp[i - 1][j - 1] + h[1],
//           dp[i - 1][j - 3] + h[2]
//         );
//       } else if (j > 1) {
//         dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + h[1]);
//       }
//     }
//     // if (dp[i][j] >= j) dp[i][j] = j;
//   }
// }

// dp.map((x) => console.log(x.join('  ')));
// console.log(dp[N][M]);
// dp[n][m] = c
// c: 최대로 건 옷의 갯수, n: 위치 갯수, m: 사용한 옷걸이 수

// 1  2  3   4  -  옷걸이의 높이
// 1  2  4   8  -  걸수있는 옷의 갯수
// 1  3  7  15  -  사용한 옷걸이

// N = 15, M = 15
// 위치 N을 모두사용 > 옷걸이 트리 사용
// ex. 15(1짜리 15개) > 8(4짜리 1개)

function maxClothesTree(N, M) {
  let maxValue = -1;

  for (let d = 0; d <= N; d++) {
    for (let c = 0; c <= N - d; c++) {
      let P = N - c - d;
      let Q = M - 15 * d - 7 * c;

      if (Q < 0) continue;

      let b = Math.max(0, Math.ceil((Q - P) / 2));

      if (b > P || 3 * b > Q) continue;

      let a = Q - 3 * b;
      if (a < 0) continue;

      maxValue = Math.max(maxValue, a + 2 * b + 4 * c);
    }
  }

  return maxValue;
}

console.log(maxClothesTree(N, M)); // 예시 결과 출력

/* 
#include <iostream>
using namespace std;

int cnt[10001];
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    for (int i = 1; i <= m; ++i) {
        cnt[i] = -1000000000;
    }

    for (int i = 1; i <= n; ++i) {
        for (int j = m; j > 0; --j) {
            cnt[j] = max(cnt[j], cnt[j - 1] + 1);
            if (j >= 3)
                cnt[j] = max(cnt[j], cnt[j - 3] + 2);
            if (j >= 7)
                cnt[j] = max(cnt[j], cnt[j - 7] + 4);
            if (j >= 15)
                cnt[j] = max(cnt[j], cnt[j - 15]);
        }
    }

    cout << (cnt[m] < 0 ? -1 : cnt[m]);
}
*/
