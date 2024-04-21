class PQ {
  constructor(isMax = true) {
    this.heap = [];
    this.compare = (a,b) => {
      return isMax ? a<b : b<a;
    }
  }
  // data = {m, v}
  enqueue(data) {
    this.heap.push(data);
    let cIndex = this.heap.length - 1;

    while(cIndex) {
      let pIndex = Math.floor((cIndex-1)/2);
      
      if(this.compare(this.heap[cIndex].v, this.heap[pIndex].v)) break;
      
      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[pIndex];
      this.heap[pIndex] = temp;
      cIndex = pIndex;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    let removeData = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.heapifyDown(0);

    return removeData;
  }

  heapifyDown(index) {
    let cIndex = index;
    let lIndex = index*2+1;
    let rIndex = lIndex + 1;

    if(lIndex < this.heap.length && this.compare(this.heap[cIndex].v, this.heap[lIndex].v)) cIndex = lIndex;
    if(rIndex < this.heap.length && this.compare(this.heap[cIndex].v, this.heap[rIndex].v)) cIndex = rIndex;
    
    if(cIndex !== index) {
      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIndex);
    }
  }

  peek() {
    return this.heap[0];
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1202.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,K] = input[index++].split(' ').map(Number);

const pq = new PQ(false); // v 오름차순
const bags = [];

// 보석 무게 오름차순
for(let i=0; i<N; i++) {
  let [weight,value] = input[index++].trim().split(' ').map(Number);
  pq.enqueue({v:weight, m:value});
}

for(let i=0; i<K; i++) {
  let c = +input[index++].trim();
  bags.push(c);
}
bags.sort((a,b)=>a-b);

let answer = 0;

// 가방을 순회하면서 그 가방에 담을 수 있는 보석들을 관리 -> 보석들은 가치를 기준으로 내림차순(PQ)
let pqV = new PQ(); // 내림차순
for(let k=0; k<K; k++) {
  while(pq.heap.length !== 0 && pq.peek().v <= bags[k]) {
    pqV.enqueue({v:pq.dequeue().m, m:K});
  }

  if(pqV.heap.length !== 0) {
    answer += pqV.dequeue().v;
  }
}

console.log(answer);