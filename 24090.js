const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '24090.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
let store = [];

let swapCount = 0;
function swap(a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  swapCount++;
  if (swapCount === K) {
    store = [arr[a], arr[b]].sort((a, b) => a - b);
  }
}

quicksort(arr, 0, N - 1);

if (store.length === 0) {
  console.log(-1);
} else {
  console.log(store.join(' '));
}

function quicksort(arr, p, r) {
  if (p < r) {
    const q = partition(arr, p, r);
    quicksort(arr, p, q - 1);
    quicksort(arr, q + 1, r);
  }
}

function partition(arr, p, r) {
  const x = arr[r]; // 기준원소
  let i = p - 1; // i는 x보다 작거나 작은 원소들의 끝지점
  for (let j = p; j <= r - 1; j++) {
    // j는 아직 정해지지 않은 원소들의 시작 지점
    if (arr[j] <= x) {
      i++;
      swap(i, j); // i값 증가 후 arr[i]와 arr[j] 교환
    }
  }
  if (i + 1 !== r) {
    swap(i + 1, r); // i + 1과 r이 서로 다르면 arr[i + 1]과 arr[r]을 교환
  }
  return i + 1;
}

// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '24090.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');

// const [N, K] = input[0].split(' ').map(Number);
// const arr = input[1].split(' ').map(Number);
// const store = [];

// let swapCount = 0;
// function swap(a, b) {
//   const temp = arr[a];
//   arr[a] = arr[b];
//   arr[b] = temp;
//   console.log(arr[a], arr[b]);
//   swapCount++;
//   if (swapCount == K) {
//     store.push([arr[a], arr[b]].sort((a, b) => a - b));
//   }
//   return [arr[a], arr[b]];
// }

// quicksort(arr, 0, N - 1);
// console.log(arr);

// if (store.length == 0) {
//   console.log(-1);
// } else {
//   console.log(store.join(' '));
// }

// function quicksort(arr, l, r) {
//   if (l < r) {
//     let i = position(arr, l, r);
//     console.log('🚀 ~ file: 24090.js:33 ~ quicksort ~ i:', i);
//     quicksort(arr, l, i - 1);
//     quicksort(arr, i + 1, r);
//   }

//   return arr;
// }

// function position(arr, l, r) {
//   let pivot = arr[r];
//   let i = l;
//   let j = r - 1;

//   while (i <= j) {
//     while (i <= j && arr[i] < pivot) i++;
//     while (i <= j && arr[j] > pivot) j--;

//     if (i < j) {
//       swap(i, j);
//       i++;
//       j--;
//     } else {
//       break;
//     }
//   }
//   swap(i, r);

//   return i;
// }
