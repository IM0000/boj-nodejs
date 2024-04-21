const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2098.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
// W[i][j] : 도시 i에서 도시 j로 가기 위한 비용
const W = Array.from(Array(N), () => Array(N).fill(0));
for (let i = 1; i <= N; i++) {
  W[i - 1] = input[i].split(' ').map(Number);
}

// 도시: 0 ~ N-1
// bit : 0 ~ (1 << N) - 1
const D = Array.from(Array(N), () => Array(1 << N).fill(-1));

// now: 현재 도시
// bit: 방문한 도시 집합
// return: 외판원 순회 최소비용
function dfs(now, bit) {
  if(bit === (1<<N)-1) {
    if(W[now][0] === 0) return Number.MAX_SAFE_INTEGER; // 첫번째 도시로 돌아갈 길이 없으면
    return W[now][0];
  }

  if(D[now][bit] !== -1) return D[now][bit]; // 이미 계산된 최소 비용이 있으면

  var min = Number.MAX_SAFE_INTEGER;
  for(let i=0; i<N; i++) {
    if(W[now][i] === 0) continue; // 길이 없으면
    if(bit & (1<<i)) continue; // 이미 방문한 도시면
    min = Math.min(min, W[now][i] + dfs(i, bit | (1<<i)));
  }
  D[now][bit] = min;
  return min;
}

console.log(dfs(0, 1));

/* 
DP 배열 설계
고려해야할 정보가 2개이기 때문에 DP 배열 또한 2차원 배열로 생성한다.

dp[현재 방문중인 정점 V][방문한 정점들의 정보 C]
이 때, C에는 위에서 비트마스킹으로 생성한 정수가 들어간다. 
이때, dp 배열에 저장되는 값이 조금 헷갈릴 수 있는데, 
V에서 출발해, C에 대해 현재 방문하지 않은 정점들을 순회하는 데에 필요한 최소 비용이 저장된다.
만일dp[3][0b00001001]이라면, 3에서 시작해 0, 3을 제외한 모든 정점을 방문하는 데에 필요한, 
즉 1, 2, 4, 5, 6, 7을 순회하는 데에 필요한 최소 비용을 저장한다.

Bottom-Up? Top-Down?
그동안 DP 문제는 주로 Bottom-Up 방식으로 풀었었는데, 이번에는 Top-Down 방식으로 풀 수 밖에 없었다.

dp 배열에 저장되는 값을 C에서 방문한 정점들을 순회하는 데에 필요한 최소 비용이라고 하고
(이 경우 위의 예시에서는 0, 3을 순회하는 데에 필요한 비용을 저장한다), 
Bottom-Up 방식으로 풀이한다고 하면, dp[0][0b0001] 다음에 갱신해야하는 인덱스는 
dp[1][0b0011], dp[2][0b0101], dp[3][0b1001]이다. 작은 단위부터 값이 순서대로 갱신되어야하는데 
단순히 반복문을 이용한 순회만으로는 차례대로 순회할 수 없기 때문에, Queue를 이용해 (V, C)쌍을 저장해주어야한다.

그리고... 이렇게 풀면 메모리 초과가 발생한다.
Queue에 들어가는 요소는 도시 수의 제곱수로 증가하기 때문에...
따라서, 재귀를 이용한 Top-Down 방식으로 접근하였다.
*/
