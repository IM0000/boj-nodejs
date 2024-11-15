// Hie with the Pie
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4069.txt';
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/);
let idx = 0;

while (idx < input.length) {
  const n = parseInt(input[idx++], 10);
  if (n === 0) break; // n=0이면 입력 종료

  const totalNodes = n + 1; // 노드 0부터 n까지
  const graph = Array.from(Array(totalNodes), () =>
    Array(totalNodes).fill(Infinity)
  );

  // 인접 행렬 입력
  for (let i = 0; i < totalNodes; i++) {
    for (let j = 0; j < totalNodes; j++) {
      graph[i][j] = parseInt(input[idx++], 10);
    }
  }

  // 플로이드 워셜 알고리즘
  for (let k = 0; k < totalNodes; k++) {
    for (let i = 0; i < totalNodes; i++) {
      for (let j = 0; j < totalNodes; j++) {
        if (graph[i][k] + graph[k][j] < graph[i][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }

  // 외판원 순회(TSP)
  const SIZE = 1 << n;
  const INF = Infinity;
  const dp = Array.from({ length: totalNodes }, () => Array(SIZE).fill(INF));
  dp[0][0] = 0;

  for (let mask = 0; mask < SIZE; mask++) {
    for (let u = 0; u < totalNodes; u++) {
      if (dp[u][mask] === INF) continue;

      for (let v = 1; v <= n; v++) {
        // 배달 위치는 1부터 n
        const bit = 1 << (v - 1);
        if ((mask & bit) === 0) {
          // 아직 방문하지 않은 곳
          const nextMask = mask | bit;
          if (dp[v][nextMask] > dp[u][mask] + graph[u][v]) {
            dp[v][nextMask] = dp[u][mask] + graph[u][v];
          }
        }
      }
    }
  }

  // 모든 주문을 배달한 후 피자리아로 돌아가는 최소 시간 계산
  const allVisited = SIZE - 1;
  let minTime = INF;
  for (let u = 1; u <= n; u++) {
    const time = dp[u][allVisited] + graph[u][0];
    if (time < minTime) {
      minTime = time;
    }
  }

  console.log(minTime);
}
