const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13335.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n,w,L] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

const bridge = [];
let time = 0, sum = 0;
for(let i=0; i<arr.length; i++) {

  if(bridge.length === w) {
    sum -= bridge.shift();
  }

  if(sum + arr[i] <= L) {
    bridge.push(arr[i]);
    sum += arr[i];
    time++;
  } else {
    bridge.push(0);
    i--;
    time++;
  }

  // if(bridge.length === w) {
  //   sum -= bridge.shift();
  // }

  // if(sum + arr[i] <= L) break;
  
  // bridge.push(0);
  // time++;
  // bridge.push(arr[i]);
  // sum += arr[i];
  // time++;
}

console.log(time + w);