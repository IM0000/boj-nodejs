const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1080.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m] = input[index++].split(' ').map(Number);
let arrA = [];
let arrB = [];

for(let i=0; i<2*n; i++) {
  if(i < n) arrA.push(input[index++].split('').map(Number));
  else arrB.push(input[index++].split('').map(Number));
}
let cnt = 0;
if(n < 3 || m < 3) {
  let same = true;
  for(let i=0; i<n; i++) {
    for(let j=0; j<m; j++) {
      if(arrA[i][j] !== arrB[i][j]) same = false;
    }
  }
  if(!same) cnt = -1;
}

for(let i=0; i<=n-3; i++) {
  for(let j=0; j<=m-3; j++) {
    if(arrA[i][j] !== arrB[i][j]) {
      for(let k=i; k<i+3; k++) {
        for(let l=j; l<j+3; l++) {
          arrA[k][l] = 1 - arrA[k][l];
        }
      }
      cnt++;
    }
  }
}

for(let i=0; i<n; i++) {
  for(let j=0; j<m; j++) {
    if(arrA[i][j] !== arrB[i][j]) {
      cnt = -1
      break;
    }
  }
}

console.log(cnt);