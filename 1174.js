const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1174.txt';
const input = +fs.readFileSync(filePath).toString().trim().split('\n');

const arr = [9,8,7,6,5,4,3,2,1,0];
const list = [];

dfs(0, 0);
list.sort((a, b) => a - b);

if(list[input-1] == undefined) {
  console.log(-1);
} else {
  console.log(list[input-1]);
}

function dfs(num, index) {
  if(list.indexOf(num) == -1) {
    list.push(num);
  }

  if(index >= 10) {
    return;
  }

  dfs(num * 10 + arr[index], index + 1);
  dfs(num, index + 1);
}