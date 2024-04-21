const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10866.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];

const answer = [];
let deq = [];
for(let i=0; i<N; i++) {
  const [command, num] = input[index++].split(' ');
  let temp;
  
  if(command === 'push_front') {
    deq = [num, ...deq];
    continue;
  } else if(command === 'push_back') {
    deq.push(num);
    continue;
  } else if(command === 'pop_front') {
    temp = deq.length ? deq.shift() : -1;
  } else if(command === 'pop_back') {
    temp = deq.length ? deq.pop() : -1;
  } else if(command === 'size') {
    answer.push(deq.length);
    continue;
  } else if(command === 'empty') {
    temp = deq.length ? 0 : 1;
  } else if(command === 'front') {
    temp = deq.length ? deq[0] : -1;
  } else if(command === 'back') {
    temp = deq.length ? deq[deq.length-1] : -1;
  }
  answer.push(temp);
}
console.log(answer.join('\n'));