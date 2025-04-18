// 이동하기 5
const fs = require('fs');
const input = fs
  .readFileSync(process.platform === 'linux' ? 0 : '20035.txt')
  .toString()
  .trim()
  .split(/\s+/);

let idx = 0;
const N = parseInt(input[idx++], 10);
const M = parseInt(input[idx++], 10);

// A 읽기
let ASum = 0;
let AMax = -1;
const maxAIndices = [];
for (let i = 0; i < N; i++) {
  const v = parseInt(input[idx++], 10);
  ASum += v;
  if (v > AMax) {
    AMax = v;
    maxAIndices.length = 0;
    maxAIndices.push(i);
  } else if (v === AMax) {
    maxAIndices.push(i);
  }
}

// B 읽기
let BSum = 0;
let BMax = -1;
const B = new Array(M);
for (let j = 0; j < M; j++) {
  const v = parseInt(input[idx++], 10);
  B[j] = v;
  BSum += v;
  if (v > BMax) BMax = v;
}

let total = 0n;
total += BigInt(ASum + AMax * (M - 1)) * 1000000000n;

if (maxAIndices.length === 1) {
  const i0 = maxAIndices[0];
  total += BigInt(BSum + B[0] * i0 + B[M - 1] * (N - i0 - 1));
} else {
  const first = maxAIndices[0];
  const last = maxAIndices[maxAIndices.length - 1];
  total += BigInt(
    BSum + B[0] * first + BMax * (last - first) + B[M - 1] * (N - last - 1)
  );
}

console.log(total.toString());
