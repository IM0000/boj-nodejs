// 우선순위 큐
class heap {
  constructor(isMin = true) {
    this.h = [];
    this.compare = (a, b) => {
      return isMin ? a < b : a > b;
    };
  }

  // data = {n, v}
  enqueue(data) {
    this.h.push(data);
    let cIndex = this.h.length - 1;
    while (cIndex > 0) {
      let pIndex = Math.floor((cIndex - 1) / 2);
      if (this.compare(this.h[cIndex].v, this.h[pIndex].v)) break;

      let temp = this.h[cIndex];
      this.h[cIndex] = this.h[pIndex];
      this.h[pIndex] = temp;
      cIndex = pIndex;
    }
  }

  dequeue() {
    if (this.h.length === 1) return this.h.pop();

    let removedData = this.h[0];
    this.h[0] = this.h.pop();

    this.heapifyDown(0);
    return removedData;
  }

  heapifyDown(index = 0) {
    let cIndex = index;
    let lIndex = cIndex * 2 + 1;
    let rIndex = lIndex + 1;

    if (
      lIndex < this.h.length &&
      this.compare(this.h[lIndex].v, this.h[cIndex].v)
    ) {
      cIndex = lIndex;
    }
    if (
      rIndex < this.h.length &&
      this.compare(this.h[rIndex].v, this.h[cIndex].v)
    ) {
      cIndex = rIndex;
    }

    if (index === cIndex) return;

    let temp = this.h[cIndex];
    this.h[cIndex] = this.h[index];
    this.h[index] = temp;

    this.heapifyDown(cIndex);
  }
}

function dijkstra(linkInfo, start, N) {
  let dist = Array(N + 1).fill(100000);

  let q = new heap();
  q.enqueue({ n: start, v: 0 });

  while (q.h.length) {
    let { n, v } = q.dequeue();
    if (dist[n] < v) continue;
    dist[n] = v;
    for (let i = 0; i < linkInfo[n].length; i++) {
      let { n: nn, v: vv } = linkInfo[n][i];
      if (dist[nn] > v + vv) {
        q.enqueue({ n: nn, v: v + vv });
      }
    }
  }
  return dist;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13424.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++];
let answer = [];
while (T--) {
  let [N, M] = input[index++].split(' ').map(Number);
  let linkInfo = Array.from(Array(N + 1), () => Array());
  for (let i = 0; i < M; i++) {
    let [a, b, c] = input[index++].split(' ').map(Number);
    if (!linkInfo[a]) linkInfo[a] = [];
    if (!linkInfo[b]) linkInfo[b] = [];
    linkInfo[a].push({ n: b, v: c });
    linkInfo[b].push({ n: a, v: c });
  }
  let K = +input[index++]; // 친구수
  let friends = input[index++].split(' ').map(Number);

  let arr = Array(N + 1).fill(0);
  for (let i = 0; i < friends.length; i++) {
    let dist = dijkstra(linkInfo, friends[i], N);
    for (let j = 0; j <= N; j++) {
      arr[j] += dist[j];
    }
  }

  let num = arr.reduce(
    (minIdx, val, idx) => (val < arr[minIdx] ? idx : minIdx),
    0
  );
  answer.push(num);
}
// 최소가 되는 방번호 출력
console.log(answer.join('\n'));
