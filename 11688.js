// 최소공배수 찾기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11688.txt';
let [a, b, L] = fs.readFileSync(filePath).toString().trim().split(' ');
const primes = Array(1000001).fill(true);

function gcd(a, b) {
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

primes[0] = primes[1] = false;
for (let i = 0; i * i <= 1000000; i++) {
  if (primes[i]) {
    for (let j = i * i; j <= 1000000; j += i) {
      primes[j] = false;
    }
  }
}
let primesArr = [];
for (let i = 2; i <= 1000000; i++) {
  if (primes[i]) {
    primesArr.push(i);
  }
}

let d = lcm(a, b);
if (gcd(d, L) == 1) {
  console.log('-1');
  process.exit(0);
}

let pf1 = {};
let idx = 0;
while (d > 1) {
  let cnt = 0;
  while (d % primesArr[idx] === 0) {
    d /= primesArr[idx];
    cnt++;
  }
  if (cnt > 0) {
    pf1[primesArr[idx]] = cnt;
  }
  idx++;
}
idx = 0;
let pf2 = {};
while (L > 1) {
  let cnt = 0;
  while (L % primesArr[idx] === 0) {
    L /= primesArr[idx];
    cnt++;
  }
  if (cnt > 0) {
    pf2[primesArr[idx]] = cnt;
  }
  idx++;
}
let pf3 = {};
for (let key in pf1) {
  if (pf2[key]) {
    if (pf1[key] === pf2[key]) continue;
    pf3[key] = Math.max(pf1[key], pf2[key]);
  } else {
    pf3[key] = pf1[key];
  }
}
if (Object.keys(pf3).length === 0) {
  for (let key in pf2) {
    if (pf1[key]) {
      if (pf1[key] === pf2[key]) continue;
      pf3[key] = Math.max(pf1[key], pf2[key]);
    } else {
      pf3[key] = pf2[key];
    }
  }
}
let c = 1;
for (let key in pf3) {
  c *= Math.pow(key, pf3[key]);
}
console.log(c);

/* 120 = 2*2*2*3*5
720 = 2*2*2*3*5*2*3
16*9 */
