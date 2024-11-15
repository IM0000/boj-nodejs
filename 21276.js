class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const removedData = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return removedData;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '21276.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++];
let pMap = {};
let people = input[index++].split(' ').sort((a, b) => a.localeCompare(b));
people.map((v, i) => (pMap[v] = i));
let preCnt = Array(N).fill(0); // 자식 수
let graph = Array.from({ length: N }, () => []); // 자식 그래프
console.log('🚀 ~ file: 21276.js:9 ~ people:', people);
console.log('🚀 ~ file: 21276.js:8 ~ pMap:', pMap);

const q = new Queue();
let M = +input[index++];
for (let i = 0; i < M; i++) {
  let [child, parent] = input[index++].split(' ');
  graph[pMap[parent]].push(pMap[child]);
  preCnt[pMap[child]]++;
}
console.log('🚀 ~ file: 21276.js:19 ~ graph:', graph);
console.log('🚀 ~ file: 21276.js:21 ~ preCnt:', preCnt);

let top = [];
for (let i = 0; i < N; i++) {
  if (preCnt[i] === 0) {
    q.add(i);
    top.push(people[i]);
  }
}

let children = Array.from({ length: N }, () => []);

while (!q.isEmpty()) {
  let pop = q.pop();
  let js = graph[pop];
  // console.log('🚀 ~ file: 21276.js:81 ~ js:', js);

  for (let i = 0; i < js.length; i++) {
    if (--preCnt[js[i]] === 0) {
      children[pop].push(people[js[i]]);
      q.add(js[i]);
    }
  }
}
let answer = [];
answer.push(top.length);
answer.push(top.join(' '));
children.map((item, i) => {
  item.sort((a, b) => a.localeCompare(b));
  answer.push(`${people[i]} ${item.length} ${item.join(' ')}`);
});
console.log(answer.join('\n'));
// console.log('🚀 ~ file: 21276.js:85 ~ children:', children);

// console.log('🚀 ~ file: 21276.js:85 ~ parent:', parent);
// let jsName = [];
// let children = Array.from({ length: N }, () => []);
// for (let i = 0; i < parent.length; i++) {
//   if (parent[i] === -1) {
//     jsName.push(people[i]);
//     continue;
//   }
//   children[parent[i]].push(people[i]);
// }
// console.log('🚀 ~ file: 21276.js:108 ~ children:', children);

// console.log(`${jsName.length}\n${jsName.join(' ')}`);
// let answer = [];
// children.map((item, i) => {
//   item.sort((a, b) => a.localeCompare(b));
//   answer.push(`${people[i]} ${item.length} ${item.join(' ')}`);
// });
// console.log(answer.join('\n'));
