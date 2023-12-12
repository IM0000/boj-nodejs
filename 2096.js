const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2096.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let index = 0;

let N = +input[index++].trim();
let inArr = Array.from(Array(N+1), ()=>Array(3).fill(0));

let curMax = [0,0,0];
let curMin = [0,0,0];
inArr[0] = [0,0,0];

for(let i=1; i<=N; i++) {
  let [a,b,c] = input[index++].trim().split(' ').map(Number);
  let [min1,min2,min3] = curMin;
  let [max1,max2,max3] = curMax;

  curMax[0] = Math.max(max1,max2) + a;
  curMax[1] = Math.max(max1,max2,max3) + b;
  curMax[2] = Math.max(max2,max3) + c;

  curMin[0] = Math.min(min1,min2) + a;
  curMin[1] = Math.min(min1,min2,min3) + b;
  curMin[2] = Math.min(min2,min3) + c;
}

let max = Math.max(...curMax);
let min = Math.min(...curMin);

console.log(max, min)

const makeMaxMinArr = (arr, isMax) => {
  let ca = arr.map((element) => [...element]);

  const compare = (a,b) => {
    return isMax ? a>b : a<b;
  }

  for(let i=1; i<arr.length; i++) {
    ca[i][0] = compare(ca[i][0] + ca[i-1][0], ca[i][0] + ca[i-1][1]) 
    ? ca[i][0] + ca[i-1][0] : ca[i][0] + ca[i-1][1]
    
    let tmpSum = compare(ca[i][1] + ca[i-1][0], ca[i][1] + ca[i-1][1])
    ? ca[i][1] + ca[i-1][0] : ca[i][1] + ca[i-1][1];
    tmpSum = compare(tmpSum, ca[i][1] + ca[i-1][2]) ? tmpSum : ca[i][1] + ca[i-1][2];

    ca[i][1] = tmpSum;

    ca[i][2] = compare(ca[i][2] + ca[i-1][1], ca[i][2] + ca[i-1][2]) 
    ? ca[i][2] + ca[i-1][1] : ca[i][2] + ca[i-1][2];
  }

  let res;
  res = compare(ca[N][0], ca[N][1]) ? ca[N][0] : ca[N][1];
  res = compare(res, ca[N][2]) ? res : ca[N][2];

  return res;
}

// var max = makeMaxMinArr(inArr, true);
// var min = makeMaxMinArr(inArr, false);
// console.log(max, min)
