// function compare(a,b) {
//   const aArr = a.split('');
//   const bArr = b.split('');
//   let dist = 0;

//   for(let i=0; i<aArr.length; i++) {
//     if(aArr[i] !== bArr[i]) {
//       dist += 1;
//     }
//   }

//   return dist;
// }

const compare = (A, B) => {
  return (
        ((A.charCodeAt(0) - B.charCodeAt(0)) && 1) 
      + ((A.charCodeAt(1) - B.charCodeAt(1)) && 1) 
      + ((A.charCodeAt(2) - B.charCodeAt(2)) && 1) 
      + ((A.charCodeAt(3) - B.charCodeAt(3)) && 1) 
  )
}

function getDist(arr) {
  let ans = 999;
  
  for(let i=0; i<arr.length; i++) {
    for(let j=0; j<arr.length; j++) {
      if(i === j) continue;
      for(let k=0; k<arr.length; k++) {
        if(i === k || j ===k) continue;

        let A,B,C;

        A = arr[i];
        B = arr[j];
        C = arr[k];
  
        if(A && B && C) {
          let dist = compare(A,B);
          dist += compare(A,C);
          dist += compare(B,C);
          
          ans = Math.min(ans,dist);
        }
  
      }
    }
  }

  return ans;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20529.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0].trim();

let ans = '';
for(let i=1; i<=2*T; i+=2) {
  let N = +input[i].trim();
  let arr = input[i+1].split(' ');

  if(N>32) {
    ans += 0 + '\n';
  } else {
    ans += getDist(arr) + '\n';
  }
}

console.log(ans.trim());