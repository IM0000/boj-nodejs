// 상자 쌓기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1905.txt';
// 입력 파싱
const input = fs.readFileSync(filePath, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;
const Lx = input[idx++];
const Ly = input[idx++];
const N = input[idx++];

// 1D 세그먼트 트리 (구간 최대, 할당 레이지)
class SegmentTree {
  constructor(n) {
    this.size = 1;
    while (this.size < n) this.size <<= 1;
    this.tree = new Array(this.size * 2).fill(0);
    this.lazy = new Array(this.size * 2).fill(null);
  }

  // 노드에 값을 할당하고 lazy 표시
  _apply(node, val) {
    this.tree[node] = val;
    this.lazy[node] = val;
  }

  // 자식으로 lazy 전파
  _push(node) {
    if (this.lazy[node] !== null) {
      this._apply(node * 2, this.lazy[node]);
      this._apply(node * 2 + 1, this.lazy[node]);
      this.lazy[node] = null;
    }
  }

  // [l..r] 구간을 val로 덮기
  update(l, r, val, node = 1, nl = 0, nr = this.size - 1) {
    if (r < nl || nr < l) return;
    if (l <= nl && nr <= r) {
      this._apply(node, val);
      return;
    }
    this._push(node);
    const mid = (nl + nr) >> 1;
    this.update(l, r, val, node * 2, nl, mid);
    this.update(l, r, val, node * 2 + 1, mid + 1, nr);
    this.tree[node] = Math.max(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  // [l..r] 구간 최대 조회
  query(l, r, node = 1, nl = 0, nr = this.size - 1) {
    if (r < nl || nr < l) return 0;
    if (l <= nl && nr <= r) {
      return this.tree[node];
    }
    this._push(node);
    const mid = (nl + nr) >> 1;
    return Math.max(
      this.query(l, r, node * 2, nl, mid),
      this.query(l, r, node * 2 + 1, mid + 1, nr)
    );
  }
}

// 각 x열마다 세그먼트 트리 생성
const segs = Array.from({ length: Lx }, () => new SegmentTree(Ly));
let ans = 0;

// 상자 처리
for (let i = 0; i < N; i++) {
  const lx = input[idx++];
  const ly = input[idx++];
  const lz = input[idx++];
  const px = input[idx++];
  const py = input[idx++];

  // 밑면 영역에서 최대 높이 조회
  let base = 0;
  for (let x = px; x < px + lx; x++) {
    base = Math.max(base, segs[x].query(py, py + ly - 1));
  }

  const top = base + lz;
  ans = Math.max(ans, top);

  // 밑면 영역에 상자의 높이로 덮기
  for (let x = px; x < px + lx; x++) {
    segs[x].update(py, py + ly - 1, top);
  }
}

// 결과 출력
console.log(ans);
