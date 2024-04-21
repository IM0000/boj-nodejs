class PQ {
  constructor(isMax = false) {
    this.heap = [];
    this.compare = (a,b) => {
      return isMax ? a<b : b<a;
    }
  }

  // data = [비교할거, ...]
  enqueue(data) {
    this.heap.push(data);
    
    let cIdx = this.heap.length - 1;
    
    while(cIdx) {
      let pIdx = Math.floor((cIdx-1)/2);
      if(this.compare(this.heap[cIdx][0], this.heap[pIdx][0])) break;

      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
      cIdx = pIdx;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    let removedData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removedData;
  }

  heapifyDown(index = 0) {
    let cIdx = index;
    let lIdx = index*2 + 1;
    let rIdx = lIdx + 1;

    if( lIdx < this.heap.length && this.compare(this.heap[cIdx][0],this.heap[lIdx][0]) ) cIdx = lIdx;
    if( rIdx < this.heap.length && this.compare(this.heap[cIdx][0],this.heap[rIdx][0]) ) cIdx = rIdx;

    if(cIdx !== index) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[cIdx]
      this.heap[cIdx] = temp;
      this.heapifyDown(cIdx);
    }

  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1766.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);
let preCnt = Array(N+1).fill(0);
let post = Array.from({length:N+1}, ()=>[]);

for(let i=0; i<M; i++) {
  let [A,B] = input[index++].split(' ').map(Number);
  preCnt[B]++;
  post[A].push(B);
}

let pq = new PQ();
for(let i=1; i<=N; i++) {
  if(preCnt[i] === 0) {
    pq.enqueue( [i] );
  }
}

let answer = [];
while(pq.heap.length !== 0) {
  let pop = pq.dequeue();
  answer.push( pop[0] );

  let postList = post[pop[0]];

  for(let i=0; i<postList.length; i++) {
    if(--preCnt[postList[i]] === 0) {
      pq.enqueue( [postList[i]] );
    }
  }
}

console.log(answer.join(' '));