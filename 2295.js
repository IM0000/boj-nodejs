const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2295.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const arr = input.map(Number).sort((a,b) => a-b);

let answer;
for(let i = arr.length-1; i>=0; i--) {
  let k = arr[i];
  
  for(let j=0; j<=i-1; j++) {
    let m = arr[j];
    let left = j;
    let right = j;

    while(left >= 0 && right <= i-1) {
      let sum = arr[left] + m + arr[right];
      if(sum === k) {
        answer = k;
        console.log(k);
        process.exit();
      } else if(sum < k) {
        right++;
      } else {
        left--;
      }
    }
  }
}