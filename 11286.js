// 최소 힙
const minHeap = [];

// 원소 추가(가장 마지막 인덱스에 추가 후 heapify)
function heapAdd(arr, data) {
  const element = {
    origin: data,
    abs: Math.abs(data)
  }
  arr.push(element);
  shiftUp(arr, arr.length-1);
}

function shiftUp(arr, idx) {
  let parentIdx = parseInt((idx - 1) / 2);
  let temp;

  if(parentIdx < 0) return;

  if(arr[parentIdx].abs > arr[idx].abs 
    || (arr[parentIdx].abs == arr[idx].abs && arr[parentIdx].origin > arr[idx].origin)) {
    let temp = arr[parentIdx];
    arr[parentIdx] = arr[idx];
    arr[idx] = temp;

    shiftUp(arr, parentIdx);
  }
}

// 원소 삭제(0번 인덱스 삭제 후 가장 마지막 요소 0번 이동시킨 후 heapify)
function heapRemove(arr) {
  if(arr.length > 0) {
    let temp = {...arr[0]};
    arr[0] = {...arr[arr.length - 1]};
    arr.pop(); // 배열 맨 뒤 제거

    shiftDown(arr, 0);
    return temp.origin;
  }
  return '0'
}

function shiftDown(arr, idx) {
  let left = idx*2 + 1;
  let right = left + 1;
  let small;

  if(left >= arr.length) { // 자식이 없는 경우
    return;
  }

  small = left;
  
  // 작은 쪽 찾기
  if(right < arr.length 
    && (arr[left].abs > arr[right].abs || (arr[left].abs == arr[right].abs && arr[left].origin > arr[right].origin))) { // 오른쪽 자식이 있고,
    small = right;
  }

  if(arr[small].abs < arr[idx].abs || (arr[small].abs == arr[idx].abs && arr[small].origin < arr[idx].origin)) {
    let temp = arr[small];
    arr[small] = arr[idx];
    arr[idx] = temp;
    shiftDown(arr, small);
  }
}

// 원래 값과 절대값 2개를 heap에 넣으면서 절대값 기준으로 heapify 하고, 만약 절대값이 같으면 원래 값 비교한다.

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11286.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0].trim());
// console.log(input)
let ans = '';
for(let i=1; i<=N; i++) {
  const x = Number(input[i].trim());

  if(x !== 0) {
    heapAdd(minHeap, x);
  } else {
    ans += heapRemove(minHeap) + '\n';
  }
}

console.log(ans.trim());