const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1068.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const P = input.shift().split(' ').map(Number);
const 제거 = +input.shift();

const 자식들 = Array.from({length:N}, ()=>[]);
const leaf = [];

for(let i=0; i<N; i++) {
  if(P[i] === -1) continue;
  자식들[P[i]].push(i);
}

for(let i=0; i<N; i++) {
  if(자식들[i].length === 0) leaf.push(i);
}

let cnt = 0;
for(let i=0; i<leaf.length; i++) {
  if(확인(leaf[i])) cnt++;
}

if(P[제거] === -1) {
  console.log(0);
} else {
  // 제거대상의 부모의 자식이 하나뿐인 경우
  if(자식들[P[제거]].length === 1) {
    cnt--;
  }
  console.log(leaf.length - cnt);
}


// 리프 부모 중 제거대상 있는지
function 확인(i) {
  if(i == 제거) return true;

  while(P[i] != 제거) {
    i = P[i];
    if(i === -1) return false;
    if(i === 제거) break;
  }
  return true;
}

