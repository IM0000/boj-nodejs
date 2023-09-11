const filePath = process.platform == 'linux' ? '/dev/stdin' : '1764.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n').map(e => e.trim());

const n = input.shift().split(' ').map(e=>parseInt(e));

var obj = {};
input.forEach(e => {
    if(!obj[e]) {
        obj[e] = 1;
    } else {
        obj[e]++;
    }
});

var dict = [];
Object.entries(obj).map(([key,value]) => {
    if(value == 2) {
        dict.push(key);
    }
})

dict.sort();
var answer = [dict.length, ...dict].join('\n');

console.log(answer);