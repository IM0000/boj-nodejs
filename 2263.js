const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2263.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input.shift();
const inOrder = input.shift().split(' ').map(Number);
const postOrder = input.shift().split(' ').map(Number);

const inOrderIndex = Array(100001);
for(let i=0; i<inOrder.length; i++) {
  inOrderIndex[inOrder[i]] = i;
}

let ans = [];
function getPreOrder(inS, inE, pS, pE) {
  if(inS > inE || pS > pE) return;

  const root = postOrder[pE]; // 루트: 후위순회의 마지막
  ans.push(root);
  const rootIndex = inOrderIndex[root]; // 중위순회의 root index
  const leftSize = rootIndex - inS; // 인덱스로부터 크기를 구함
  // 이유: 중위순회의 root index는 후위순회의 index와 전혀 관련이 없다.

  getPreOrder(inS, rootIndex-1, pS, pS+leftSize-1); // 왼쪽 자식
  getPreOrder(rootIndex+1, inE, pS+leftSize, pE-1); // 오른쪽 자식
}


getPreOrder(0, n-1, 0, n-1);
console.log(ans.join(' '));