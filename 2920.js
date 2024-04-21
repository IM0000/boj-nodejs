const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2920.txt';
const arr = fs.readFileSync(filePath).toString().trim().split(' ');

let as = false;
let ds = false;

let tmp1 = arr[0];
for(let i=1; i<arr.length; i++) {
  let tmp2 = Number(tmp1) - Number(arr[i]);
  if(tmp2 < 0) as = true;
  else if(tmp2 > 0) ds = true;
  tmp1 = arr[i];
}

if(as && !ds) console.log('ascending')
else if(!as && ds) console.log('descending')
else console.log('mixed');