const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1141.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');
const N = +input.shift();
const arr = input;
arr.sort((a,b) => {
  if(a.length === b.length) return a - b;
  return a.length - b.length;
});
const set = new Set();

for(let i=0; i<N; i++) {
  let str = arr[i];
  let isPrefix = false;
  for(let j=i+1; j<N; j++) {
    let str2 = arr[j];
    if(str2.startsWith(str)) {
      isPrefix = true;
      break;
    }
  }
  if(!isPrefix) set.add(str);
}

// set 갯수
console.log(set.size);