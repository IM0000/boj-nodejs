// 레벨 햄버거
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '16974.txt';
let [n, x] = fs.readFileSync(filePath).toString().split(' ').map(Number);
const p = []; // p[레벨] = 패티의 갯수, p[n] = p[n-1] * 2 + 1
p[0] = 1;

for (let i = 1; i <= 50; i++) {
  p[i] = p[i - 1] * 2 + 1;
}

// 먹은 패티 수 구하는 함수
function recur(N, X) {
  if (X === 0) {
    return 0;
  }
  if (N === 0) {
    return 1;
  }

  if (X < p[N]) {
    // 1) 절반보다 적게 먹는 경우
    return recur(N - 1, X - 1);
  } else if (X === p[N]) {
    // 2) 절반까지 먹는 경우
    return p[N - 1] + 1;
  } else {
    // 3) 절반 초과로 먹는 경우
    return p[N - 1] + 1 + recur(N - 1, X - p[N]);
  }
}

console.log(recur(n, x));
