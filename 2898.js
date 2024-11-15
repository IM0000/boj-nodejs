// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '2898.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// let index = 0;
// const [W, L, N] = input[index++].split(' ').map(Number);

// const blockKeys = [];

// for (let i = 0; i < N; i++) {
//   let ceil = input[index++].split(' ').map(Number);
//   let floor = input[index++].split(' ').map(Number);

//   let lengthList = [];
//   for (let j = 0; j < L; j++) {
//     lengthList.push(W - (ceil[j] + floor[j]));
//   }
//   let diffList = [];
//   for (let j = 0; j < L; j++) {
//     diffList.push(floor[0] - floor[j]);
//   }

//   blockKeys.push({ lengthList, diffList });
// }

// const uniqueData = new Set(blockKeys.map((item) => JSON.stringify(item)));

// for (let i = 0; i < uniqueData.length; i++) {
//   let { lengthList, diffList } = JSON.parse(uniqueData[i]);

//   let newLen = lengthList;
//   newLen.reverse();
//   let newDiff = diffList;
//   newDiff.reverse();

//   let newObj = { lengthList: newLen, diffList: newDiff };
//   uniqueData.add(JSON.stringify(newObj));
// }

// console.log(uniqueData.size);

// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '2898.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');

// let index = 0;
// const [w, l, n] = input[index++].split(' ').map(Number);

// const keys = [];

// for (let i = 0; i < n; i++) {
//   const upper = input[index++].split(' ').map(Number);
//   const lower = input[index++].split(' ').map(Number);

//   let minimal = Math.min(...lower);

//   const ok = Array(keys.length).fill(true);
//   const okFlipped = Array(keys.length).fill(true);
//   const me = [];
//   const meFlipped = [];

//   for (let j = 0; j < l; j++) {
//     const thisoff = lower[j] - minimal;
//     const thiswidth = w - upper[j] - lower[j];
//     me.push([thisoff, thiswidth]);

//     const thisoffFlipped = lower[l - j - 1] - minimal;
//     const thiswidthFlipped = w - upper[l - j - 1] - lower[l - j - 1];
//     meFlipped.push([thisoffFlipped, thiswidthFlipped]);

//     for (let k = 0; k < keys.length; k++) {
//       if (ok[k] && (thisoff !== keys[k][j][0] || thiswidth !== keys[k][j][1])) {
//         ok[k] = false;
//       }
//       if (
//         okFlipped[k] &&
//         (thisoffFlipped !== keys[k][j][0] || thiswidthFlipped !== keys[k][j][1])
//       ) {
//         okFlipped[k] = false;
//       }
//     }
//   }

//   let isok = false;
//   for (let k = 0; k < keys.length; k++) {
//     if (ok[k] || okFlipped[k]) {
//       isok = true;
//       break;
//     }
//   }

//   if (!isok || keys.length === 0) {
//     keys.push(me);
//   }
// }

// console.log(keys.length);
// console.log('🚀 ~ file: 2898.js:97 ~ keys:', keys);
const fs = require('fs');

const input = fs.readFileSync(0, 'utf-8').toString().trim().split('\n');
const [w, l, n] = input.shift().split(' ').map(Number);
const keys = new Set();
let ans = 0;

for (let i = 0; i < n; i += 2) {
  const top = input[i].split(' ').map(Number);
  const bottom = input[i + 1].split(' ').map(Number);

  const miniTop = Math.min(...top);
  for (let j = 0; j < l; j++) {
    top[j] -= miniTop;
  }
  for (let j = 0; j < l; j++) {
    bottom[j] += miniTop;
  }

  if (!keys.has(JSON.stringify([top, bottom]))) {
    ans++;
    keys.add(JSON.stringify([top, bottom]));

    top.reverse();
    bottom.reverse();
    keys.add(JSON.stringify([top, bottom]));

    const miniSwapped = Math.min(
      ...top.map((v, idx) => Math.min(v, bottom[idx]))
    );
    for (let j = 0; j < l; j++) {
      const temp = top[j];
      top[j] = bottom[j] - miniSwapped;
      bottom[j] = temp + miniSwapped;
    }

    keys.add(JSON.stringify([top, bottom]));

    top.reverse();
    bottom.reverse();
    keys.add(JSON.stringify([top, bottom]));
  }
}

console.log(ans);
