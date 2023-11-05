const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15663.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number).sort((a,b)=>a-b);
const visited = Array(N).fill(0);

const temp = [];
const answer = [];
const dfs = (index, length) => {
  if(length === M) {
    answer.push(temp.join(' ').trim());
    return;
  }

  for(let i=index; i<N; i++) {
    if(!visited[i]) {
      visited[i] = true;
      temp.push(arr[i]);
      dfs(i, length+1);
      temp.pop();
      visited[i] = 0;
    }
  }
}

dfs(0,0);
// console.log(answer)
const setAnswer = new Set(answer);
console.log(Array.from(setAnswer).join('\n'));
