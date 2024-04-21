class minHeap {
  constructor() {
    this.heap = [];
  }

  peek() {
    return this.heap[0];
  }

  // data = {w:w}
  enqueue(data) {
    this.heap.push(data);

    let curIndex = this.heap.length - 1;

    while (curIndex !== 0) {
      let parIndex = Math.floor((curIndex - 1) / 2);

      if (this.heap[parIndex].w < this.heap[curIndex].w) break;

      let temp = this.heap[curIndex];
      this.heap[curIndex] = this.heap[parIndex];
      this.heap[parIndex] = temp;
      curIndex = parIndex;
    }
  }

  dequeue() {
    if (this.heap.length === 1) return this.heap.pop();

    let pop = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return pop;
  }

  heapifyDown(index) {
    let leftIndex = index * 2 + 1;
    let rightIndex = leftIndex + 1;

    let curIndex = index;
    if (
      leftIndex < this.heap.length &&
      this.heap[leftIndex].w < this.heap[curIndex].w
    )
      curIndex = leftIndex;
    if (
      rightIndex < this.heap.length &&
      this.heap[rightIndex].w < this.heap[curIndex].w
    )
      curIndex = rightIndex;

    if (curIndex !== index) {
      let temp = this.heap[curIndex];
      this.heap[curIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(curIndex);
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1374.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];

let lecture = [];
for (let i = 0; i < N; i++) {
  let [n, s, e] = input[index++].split(' ').map(Number);
  lecture.push([n, s, e]);
}

// 시작시간 정렬
lecture.sort((a, b) => {
  if (a[1] == b[1]) return a[2] - b[2];
  return a[1] - b[1];
});

const heap = new minHeap();
let room = 1;
heap.enqueue({ w: lecture[0][2] });

for (let i = 1; i < N; i++) {
  let next = lecture[i];
  let curMin = heap.peek();

  if(next[1] >= curMin.w) {
    heap.dequeue();
    heap.enqueue({ w: next[2] });
  } else {
    room++;
    heap.enqueue({ w: next[2] });
  }
}

console.log(room);

/// 시간초과
// const map = {};
// for (let i = 0; i < N; i++) {
//   const [num, start, end] = input[index++].split(' ').map(Number);

//   update(start, end);
// }

// let max = Number.MIN_SAFE_INTEGER;
// for (let key in map) {
//   max = Math.max(max, map[key]);
// }

// console.log(max);
// function update(start, end) {
//   cnt++;
//   const keys = Object.keys(map);
//   let filter = false;

//   for (let i = 0; i < keys.length; i++) {
//     let key = keys[i];
//     let [min, max] = key.split('-').map(Number);

//     let tmp = map[key];

//     //1.start < min && min < end && end < max
//     if (start < min && min < end && end < max) {
//       delete map[key];
//       map[`${min}-${end}`] = tmp + 1;
//       map[`${end}-${max}`] = tmp;
//       update(start, min);
//       filter = true;
//       break;
//     }
//     //2.start < min && end == max
//     else if (start < min && end == max) {
//       map[key] += 1;
//       update(start, min);
//       filter = true;
//       break;
//     }
//     //3.start < min && max < end
//     else if (start < min && max < end) {
//       map[key] += 1;
//       update(start, min);
//       update(max, end);
//       filter = true;
//       break;
//     }
//     //4.start == min && end < max
//     else if (start == min && end < max) {
//       delete map[key];
//       map[`${start}-${end}`] = tmp + 1;
//       map[`${end}-${max}`] = tmp;
//       filter = true;
//       break;
//     }
//     //5.start == min && end == max
//     else if (start == min && end == max) {
//       map[key] += 1;
//       filter = true;
//       break;
//     }
//     //6.start == min && max < end
//     else if (start == min && max < end) {
//       map[key] += 1;
//       update(max, end);
//       filter = true;
//       break;
//     }
//     //7.min < start && end < max
//     else if (min < start && end < max) {
//       delete map[key];
//       map[`${min}-${start}`] = tmp;
//       map[`${start}-${end}`] = tmp + 1;
//       map[`${end}-${max}`] = tmp;
//       filter = true;
//       break;
//     }
//     //8.min < start && end == max
//     else if (min < start && start < max && end == max) {
//       delete map[key];
//       map[`${min}-${start}`] = tmp;
//       map[`${start}-${end}`] = tmp + 1;
//       filter = true;
//       break;
//     }
//     //9.min < start && max < end
//     else if (min < start && start < max && max < end) {
//       delete map[key];
//       map[`${min}-${start}`] = tmp;
//       map[`${start}-${max}`] = tmp + 1;
//       update(max, end);
//       filter = true;
//       break;
//     }
//   }

//   if (!filter) map[`${start}-${end}`] = 1;
// }
