const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15657.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number).sort((a,b) => a-b);

const answer = [];
const temp = [];
const dfs = (index, length) => {
  if(length === M) {
    answer.push(temp.join(' ').trim());
    return;
  }

  for(let i=index; i<N; i++) {
    temp.push(arr[i]);
    dfs(i, length+1);
    temp.pop();
  }
}

dfs(0,0);

console.log(answer.join('\n'));