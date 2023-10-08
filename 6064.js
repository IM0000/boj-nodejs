const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '6064.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input.shift().trim());

let ans = '';

input.forEach(e => {
  let arr = e.trim().split(' ').map(Number);
  ans += sol3(arr) + '\n';
})

console.log(ans.trim());


function sol3(arr) {
  const [M,N,x,y] = arr;
  let tmpM = x, tmpN = y;
  let lcm = LCM(M,N);

  if(tmpM === tmpN) {
    return tmpM;
  }

  while(tmpM !== tmpN) {
    if(tmpM < tmpN) {
      tmpM += M;
    } else if(tmpM > tmpN) {
      tmpN += N;
    }
    
    if(tmpM === tmpN) {
      return tmpM;
    }

    if(tmpN > lcm || tmpM > lcm) {
      return -1;
    }
  }
}



function sol(arr) {
  const [M,N,x,y] = arr;
  const lcm = LCM(M,N);

  for(let i=1; i<=lcm; i++) {
    let tx = i%M;
    let ty = i%N;
    if(tx === 0) tx = M;
    if(ty === 0) ty = N;

    if(tx === x && ty === y) {
      return i;
    }
  }
  return -1;
}

function sol2(arr) {
  let [M,N,x,y] = arr;
  if(N<M) {
    let tmp1 = N;
    N = M; M =tmp1;
    let tmp2 = y;
    y = x; x = tmp2;
  }
  
  if(M == N) {
    if(x !== y) {
      return -1;
    }
    return x;
  }

  let mnDiff = [0];

  let diff = 0;
  let i = 1;
  while(diff !== M) { // M - N 배열 만들기
    if(i % 2 === 1) {
      diff = mnDiff[i-1] - M;
    } else {
      diff = mnDiff[i-1] + N;
    }
    if(diff === M) break;
    mnDiff[i] = diff;
    i++;
  }

  // console.log(mnDiff);
  if(mnDiff.indexOf(x-y) === -1) {
    return -1;
  }

  let index = mnDiff.indexOf(x-y);
  // console.log(index);
  return Math.ceil((index-1)/2) * M + x;
}

function GCD(A,B) {
  let b = A;
  let s = B;
  if(B>A) {
    b = B; 
    s = A;
  }

  while(b%s !== 0) {
    let tmp = b;
    b = s;
    s = tmp%s;
  }

  return s;
}

function LCM(A,B) {
  return A*B/GCD(A,B);
}
