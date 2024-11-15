// 로드샵
// 최소 사용 구슬 = n * m
//   if n * m > r => 0
// 최소 사용 구슬 제외했을 때 나머지 채워야할 구슬 갯수 = r - n * m
// 결국, 나머지 구슬을 n개의 색상에 배분하는 경우의 수와 동일 == 별과 막대
// ex) * * | * * | * : 별 5개를 3개의 구역에 분배하는 경우의 수 = C(5+3-1, 3-1)
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5616.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, r] = input[0].split(' ').map(Number);

if (n * m > r) {
  console.log(0);
  process.exit(0);
}

console.log(combination(r - n * m + n - 1, n - 1));

function combination(n, r) {
  if (r > n - r) r = n - r;
  let result = BigInt(1);
  for (let i = 1; i <= r; i++) {
    result *= BigInt(n - r + i);
    result /= BigInt(i);
  }
  return result.toString();
}
