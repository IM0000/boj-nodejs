class Heap {
  // isEmpty, enq, deq, heapifyDown
  constructor(isMax) {
    this.heap = [];
    this.compare = (a,b) => {
      return isMax ? a<b : b<a;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  enqueue(data) {
    this.heap.push(data);

    let currentIdx = this.heap.length - 1;
    
    while(currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      if(this.compare(this.heap[currentIdx], this.heap[parentIdx])) break;

      // swap
      const temp = this.heap[currentIdx];
      this.heap[currentIdx] = this.heap[parentIdx];
      this.heap[parentIdx] = temp;
      // [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];
      currentIdx = parentIdx;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    const removedData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removedData;
  }

  heapifyDown(index) {

    const leftIdx = index * 2 + 1
    const rightIdx = leftIdx + 1;
    let currentIdx = index;

    if(leftIdx < this.heap.length && this.compare(this.heap[currentIdx], this.heap[leftIdx])) 
      currentIdx = leftIdx;
    if(rightIdx < this.heap.length && this.compare(this.heap[currentIdx], this.heap[rightIdx])) 
      currentIdx = rightIdx;

    if(currentIdx !== index) {
      const temp = this.heap[currentIdx];
      this.heap[currentIdx] = this.heap[index];
      this.heap[index] = temp;
      // [this.heap[currentIdx], this.heap[index]] = [this.heap[index], this.heap[currentIdx]];
      this.heapifyDown(currentIdx);
    }
  }
}

class DoublePriority {
  constructor() {
    this.maxHeap = new Heap(true);
    this.minHeap = new Heap(false);
    this.store = {};
  }

  push(data) {
    this.maxHeap.enqueue(data);
    this.minHeap.enqueue(data);

    if (!this.store[data]) this.store[data] = 1;
    else this.store[data]++;
  }

  pop(isMax) {
    const heap = isMax ? this.maxHeap : this.minHeap;

    while (!heap.isEmpty()) {
      const pop = heap.dequeue();

      if (!this.store[pop]) continue;

      if (this.store[pop] === 1) delete this.store[pop];
      else this.store[pop]--;

      return pop;
    }
  }
}


const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7662.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();

const answer = [];

while(T--) {
  const doublePriority = new DoublePriority();
  const Q = +input[index++].trim();

  for(let i=0; i<Q; i++) {
    const command = input[index++].split(' ');
    // console.log(method, value)
    if(command[0] === 'I') doublePriority.push(+command[1]);
    else if(command[0] === 'D') {
      doublePriority.pop(+command[1] === 1);
    }
  }

  const max = doublePriority.pop(true);
  const min = doublePriority.pop(false) || max;

  if(max) answer.push(`${max} ${min}`);
  else answer.push('EMPTY');
}

console.log(answer.join('\n'));