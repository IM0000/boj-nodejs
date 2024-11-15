// 접시 포개기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30410.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const arr = input[1].trim().split(' ').map(Number);

// 1의 연속갯수, 2의 연속갯수를 파악
// 1의 짝수개의 연속갯수는 그냥 합침
// "...구간1...구간2...구간1..."의 경우를 모두 구함.
const seq = [];
let i = 0;
while (i < N) {
  let st = i;
  let num = arr[i];
  while (i + 1 < N && arr[i + 1] === num) {
    i++;
  }

  if (num === 1 && (i - st + 1) % 2 === 0) {
    seq.push({
      num: 2,
      cnt: (i - st + 1) / 2,
    });
  } else {
    seq.push({
      num: num,
      cnt: i - st + 1,
    });
  }
  i++;
}

let filterSeq = [];
for (let i = 0; i < seq.length; i++) {
  let { num, cnt } = seq[i];

  while (num === 2 && i + 1 < seq.length && seq[i + 1].num === 2) {
    cnt += seq[i + 1].cnt;
    i++;
  }

  filterSeq.push({ num, cnt });
}

let max = 1;
let only1 = true;
for (let i = 0; i < filterSeq.length; i++) {
  let { num, cnt } = filterSeq[i];

  if (num === 2) {
    only1 = false;
    if (i - 1 >= 0 && filterSeq[i - 1].num === 1) {
      cnt += Math.floor(filterSeq[i - 1].cnt / 2);
    }

    if (i + 1 < filterSeq.length && filterSeq[i + 1].num === 1) {
      cnt += Math.floor(filterSeq[i + 1].cnt / 2);
    }

    let l2 = Math.log2(cnt);

    l2 = Math.floor(l2) + 1;
    max = Math.max(max, 2 ** l2);
  }
}
if (only1) {
  let cnt = filterSeq[0].cnt / 2;
  let l2 = Math.log2(cnt);
  l2 = Math.floor(l2) + 1;
  max = Math.max(max, 2 ** l2);
}

// 2^log2(cnt)+1
console.log(max);
