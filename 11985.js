// 오렌지 출하
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11985.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N, M, K] = input.shift().split(' ').map(BigInt);
const A = input.map(BigInt);

N = Number(N);
M = Number(M);
K = BigInt(K);

const dp = new Array(N + 1).fill(BigInt('1' + '0'.repeat(20))); // 충분히 큰 값으로 초기화
dp[0] = BigInt(0);

// 세그먼트 트리 구현
class SegmentTree {
  constructor(arr, operation) {
    this.n = arr.length;
    this.tree = Array(2 * this.n);
    this.operation = operation; // 'max' or 'min'
    this.build(arr);
  }

  build(arr) {
    for (let i = 0; i < this.n; i++) {
      this.tree[i + this.n] = arr[i];
    }
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this._applyOperation(
        this.tree[i * 2],
        this.tree[i * 2 + 1]
      );
    }
  }

  _applyOperation(left, right) {
    if (this.operation === 'max') return left > right ? left : right;
    if (this.operation === 'min') return left < right ? left : right;
    return null;
  }

  query(l, r) {
    l += this.n;
    r += this.n;
    let result =
      this.operation === 'max'
        ? -BigInt('1' + '0'.repeat(20))
        : BigInt('1' + '0'.repeat(20));
    while (l < r) {
      if (l & 1) result = this._applyOperation(result, this.tree[l++]);
      if (r & 1) result = this._applyOperation(result, this.tree[--r]);
      l >>= 1;
      r >>= 1;
    }
    return result;
  }
}

// 최대값과 최소값을 구하는 세그먼트 트리 초기화
const maxSegmentTree = new SegmentTree(A, 'max');
const minSegmentTree = new SegmentTree(A, 'min');

for (let i = 1; i <= N; i++) {
  for (let s = 1; s <= Math.min(M, i); s++) {
    const idx = i - s;

    // 구간 최대값과 최소값 쿼리
    const maxVal = maxSegmentTree.query(idx, i);
    const minVal = minSegmentTree.query(idx, i);

    const sBigInt = BigInt(s);
    const cost = K + sBigInt * (maxVal - minVal);

    if (dp[i] > dp[idx] + cost) {
      dp[i] = dp[idx] + cost;
    }
  }
}

console.log(dp[N].toString());
