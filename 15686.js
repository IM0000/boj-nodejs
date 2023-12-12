const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15686.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const [N, M] = input[index++].split(' ').map(Number);


let map = Array.from(Array(N), () => Array(N));
let cArr = []; // 2
let hArr = []; // 1

for(let i = 0; i<N; i++) {
  let arr = input[index++].split(' ').map(Number);
  for(let j = 0; j<arr.length; j++) {
    map[i][j] = arr[j];
    if(arr[j] === 1) {
      hArr.push({r:i, c:j});
    } else if(arr[j] === 2) {
      cArr.push({r:i, c:j});
    }
  }
}

const getDistance = (A, B) => {
  let Ar = A.r, Ac = A.c;
  let Br = B.r, Bc = B.c;

  return Math.abs(Ar-Br) + Math.abs(Ac-Bc);
}
// console.log("🚀 ~ file: 15686.js:30 ~ getDistance ~ getDistance:", getDistance(hArr[0],cArr[0]))

// 치킨집에서 모든 집까지의 거리의 합
// for(let c = 0; c<cArr.length; c++) {
//   let chicken = cArr[c];
//   for(let h = 0; h<hArr.length; h++) {
//     chicken.sum += getDistance(chicken, hArr[h]);
//   }
// }
// console.log("🚀 ~ file: 15686.js:20 ~ cArr:", cArr)


function combination(cArr, m) {
  let combinationArr = [];

  function backtrack(start, arr) {
    if(arr.length === m) {
      combinationArr.push([...arr]);
      return;
    }

    for(let i=start; i<cArr.length; i++) {
      arr.push(cArr[i]);
      backtrack(i+1, arr);
      arr.pop();
    }
  }
  
  backtrack(0,[]);
  return combinationArr;
}

let combinationRes = combination(cArr, M);
// console.log("🚀 ~ file: 15686.js:63 ~ combinationRes:", combinationRes)


// cArr = cArr.sort((a,b) => {return a.sum - b.sum}).slice(0, M);
// console.log("🚀 ~ file: 15686.js:42 ~ cArr:", cArr)

let urbanDistance = 99999;
for(let cs = 0; cs<combinationRes.length; cs++) {
  let csArr = combinationRes[cs];
  // console.log("🚀 ~ file: 15686.js:73 ~ csArr:", csArr)
  
  let tmp = 0;
  for(let h = 0; h<hArr.length; h++) {
    let min = 101;
    for(let c = 0; c<csArr.length; c++) {
      min = Math.min(min, getDistance(hArr[h], csArr[c]));
    }
    tmp += min;
  }
  urbanDistance = Math.min(urbanDistance, tmp);
}
// for(let h = 0; h<hArr.length; h++) {
//   let min = 101;
//   for(let c = 0; c<cArr.length; c++) {
//     min = Math.min(min, getDistance(hArr[h], cArr[c]));
//     // console.log("🚀 ~ file: 15686.js:49 ~ min:", min)
//   }
//   urbanDistance += min;
// }
// console.log("🚀 ~ file: 15686.js:16 ~ map:", map)
// console.log("🚀 ~ file: 15686.js:18 ~ hArr:", hArr)

console.log(urbanDistance)