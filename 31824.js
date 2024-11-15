// const fs = require('fs');
// const filePath = process.platform === 'linux' ? 0 : '31824.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// let index = 0;
// const [N, M] = input[index++].split(' ').map(Number);
// const answer = [];

// const information = [];
// for (let i = 0; i < N; i++) {
//   const [prefix, output] = input[index++].split(' ').map((x) => x.trim());
//   information.push([prefix, output]);
// }
// information.sort((a, b) => a[0].localeCompare(b[0]));

// for (let i = 0; i < M; i++) {
//   const S = input[index++].trim();
//   const used = Array.from({ length: N }, () => false);

//   let ans = [];
//   for (let k = 0; k < S.length; k++) {
//     //
//     for (let j = 0; j < information.length; j++) {
//       if (used[j]) continue;
//       if (information[j][0].length > S.length - k) continue;
//       if (information[j][0] === S.slice(k, k + information[j][0].length)) {
//         console.log(
//           '🚀 ~ file: 31824.js:30 ~ information[j][0]:',
//           information[j][0]
//         );
//         console.log(
//           '🚀 ~ file: 31824.js:31 ~ S.slice(k, k + information[j][0].length):',
//           S.slice(k, k + information[j][0].length)
//         );
//         ans.push(information[j][1]);
//         used[j] = true;
//         continue;
//       }
//     }
//     //
//     if (k === S.length - 1) {
//       if (ans.length === 0) {
//         answer.push(-1);
//       } else {
//         answer.push(ans.join(''));
//       }
//     }
//   }
// }

// console.log(answer.join('\n'));
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '31824.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const answer = [];

const information = [];
for (let i = 0; i < N; i++) {
  const [word, meaning] = input[index++].split(' ').map((x) => x.trim());
  information.push([word, meaning]);
}
information.sort((a, b) => a[0].localeCompare(b[0]));

for (let i = 0; i < M; i++) {
  const S = input[index++].trim();
  let found = false;
  let result = '';

  for (let k = 0; k < S.length; k++) {
    for (let j = 0; j < information.length; j++) {
      const [word, meaning] = information[j];
      if (word.length > S.length - k) continue;
      if (word === S.slice(k, k + word.length)) {
        result += meaning;
        found = true;
      }
    }
  }

  if (!found) {
    answer.push(-1);
  } else {
    answer.push(result);
  }
}

console.log(answer.join('\n'));
