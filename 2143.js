const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2143.txt';
const input = fs.readFileSync(filePath).toString().split('\n').map(a=>a.trim());

let index = 0;
const T = +input[index++];
const an = +input[index++];
const A = input[index++].split(' ').map(Number);
const bn = +input[index++];
const B = input[index++].split(' ').map(Number);

// A, B의 누적합 배열
let aS = Array(an+1).fill(0);
for(let i=0; i<an; i++) {
  aS[i+1] = aS[i] + A[i];
}
let bS = Array(bn+1).fill(0);
for(let i=0; i<bn; i++) {
  bS[i+1] = bS[i] + B[i];
}

// A, B 배열의 모든 연속합
let aArr = [];
for(let i=0; i<=an; i++) {
  for(let j=i+1; j<=an; j++) {
    aArr.push(aS[j] - aS[i])
  }
}
aArr.sort((a,b)=>a-b);
let bArr = [];
for(let i=0; i<=bn; i++) {
  for(let j=i+1; j<=bn; j++) {
    bArr.push(bS[j] - bS[i])
  }
}
bArr.sort((a,b)=>a-b);

let answer = 0;
for(let i=0; i<aArr.length; i++) {
  let target = T - aArr[i];
  answer += binarySearch(bArr, 0, bArr.length-1, target);
}
console.log(answer);

function binarySearch(arr, s, e, t) {
  let ts = s;
  let te = e;
  let lowIndex = -1;
  let upIndex = -1;

  while(s <= e) {    
    let mid = Math.floor((s+e)/2);

    if(arr[mid] >= t) {
      lowIndex = mid;
      e = mid - 1;
      
    }else {
      s = mid + 1;
    }
  }
  
  s = ts;
  e = te;
  while(s <= e) {    
    let mid = Math.floor((s+e)/2);

    if(arr[mid] <= t) {
      upIndex = mid;
      s = mid + 1;
      
    }else {
      e = mid - 1;
    }
  }

  if(lowIndex === -1) {
    return 0;
  }

  return upIndex - lowIndex + 1;
}