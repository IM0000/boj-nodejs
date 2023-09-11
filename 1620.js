const filePath = process.platform === 'linux' ? '/dev/stdin' : '1620.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n').map(e => e.trim());

// 1 <= N,M <= 100,000
const [N, M] = input[0].split(' ').map(Number);
var nameKeyMap = {};
const dogamList = input.slice(1, N + 1);
dogamList.forEach((element, idx) => {
    nameKeyMap[element] = idx+1;
});

const quizList = input.slice(N + 1, N + M + 1);

// quizList.forEach((element) => {
//     if(Number.isNaN(Number(element))) {
//         console.log(nameKeyMap[element]);
//     } else {
//         console.log(dogamList[element-1]);
//     }
// })

const n = input.shift().split(' ').map(e => parseInt(e));
const map = {};
input.splice(0,n[0]).forEach((e,i) => {
    map[e] = i+1;
    map[i+1] = e;
});

var answer = input.map(e=>map[e]).join('\n');
// console.log(map)
console.log(answer)

// quizList.forEach((element,idx) => {
//     if(Number.isNaN(Number(element))) {
//         console.log(dogamList.indexOf(element) + 1);
//     } else {
//         console.log(dogamList[+element-1]);
//     }
// })