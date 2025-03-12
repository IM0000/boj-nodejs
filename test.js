const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = Number(input[0]);
const testCases = input.slice(1);

for (let test of testCases) {
  // 6을 9로 변경
  let digits = test.split('').map((ch) => (ch === '6' ? '9' : ch));
  // 내림차순 정렬 (숫자로 비교)
  digits.sort((a, b) => Number(b) - Number(a));

  let s1 = '';
  let s2 = '';
  // 각 자릿수를 그리디하게 분배: 두 수 중 작은 값의 뒤에 붙임
  for (let d of digits) {
    // 빈 문자열이면 0으로 간주하여 BigInt 비교
    let num1 = s1 === '' ? 0n : BigInt(s1);
    let num2 = s2 === '' ? 0n : BigInt(s2);
    if (num1 <= num2) {
      s1 += d;
    } else {
      s2 += d;
    }
  }

  // 두 수의 곱을 BigInt로 계산
  const product = BigInt(s1) * BigInt(s2);
  console.log(product.toString());
}
