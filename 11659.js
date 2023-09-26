const filePath = process.platform === 'linux' ? '/dev/stdin' : '11659.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input.shift().split(' ').map(e => Number(e.trim()));
const arr1 = input.shift().split(' ').map(e => Number(e.trim()));
let arr2 = [];

// 구간합 배열 만들기 O(n)
for(let i=0; i<arr1.length; i++) {
  if(i===0) {
    arr2[i] = arr1[i];
    continue;
  }
  arr2[i] = arr2[i-1] + arr1[i];
}
// x y => arr2[y-1] - arr2[x-2]
// x == 1 : 빼기 0
let answer = '';
input.forEach(e=>{
  let [x,y] = e.split(' ').map(Number);
  x = x === 1 ? 0 : arr2[x-2];
  y = arr2[y-1];
  answer += (y-x) + '\n';
})
console.log(answer.trim());
