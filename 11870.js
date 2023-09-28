const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11870.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = input.shift().trim();
const arr = input[0].split(' ').map(e=>Number(e.trim()));

// 중복 제거 and 정렬
let s = new Set(arr);
const sortedArr = Array.from(s).sort((a,b)=>a-b);

// map에 순위 저장
let map = {};
for(let i=0; i<arr.length; i++) {
    map[sortedArr[i]] = i;
}

var answer = arr.map(e=>map[e]).join(' ');

console.log(answer);