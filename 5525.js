const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5525.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input.shift().trim());
const M = Number(input.shift().trim());
const str = input.shift();

// console.log(str);

let cnt = 0;
let n = 0;
for(let i=0; i<M; i++) {
  if(str[i] === 'I') {

    while(str[i+1] === 'O' && str[i+2] === 'I') {
      n+=1;

      if(n === N) {
        cnt+=1;
        n--;
      }

      i+=2;
    }

    n = 0;
  }

}

console.log(cnt);

// let matched = '';
// for(let i=0; i<N; i++) {
//   matched += 'IO';
//   if(i === N-1) {
//     matched += 'I';
//   }
// }

// let count = 0;
// const pl = N*2+1;
// for(let i=0; i<=M-pl; i++) {
//   let slice = str.substring(i,i+pl);
//   let slice2 = str.substring(i+pl, i+pl+2);
// // console.log(slice)
//   if(slice === matched) {
//     count++;
//     if(slice2 === 'OI') {
//       i+=1;
//     } else if(slice2 === 'IO' && i+pl < M-pl){
//       i = i+pl-1
//     } else if(slice2 === 'II' && i+pl+1 < M-pl) {
//       i = i+pl
//     } else if(slice2 === 'OO' && i+pl+2 < M-pl) {
//       i = i+pl+1
//     }
//   }
// }

// console.log(count);