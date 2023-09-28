// 1 2 3 5 8 
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11726.txt';
const input = fs.readFileSync(filePath).toString().trim();

const n = input;

let arr = [];

for(let i=0; i<n; i++) {
    if(i==0) arr[i] = 1;
    else if(i==1) arr[i] = 2;
    else arr[i] = (arr[i-2] + arr[i-1]) % 10007;
}

console.log(arr[n-1]);