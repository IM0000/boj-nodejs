const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15654.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number).sort((a,b) => a-b);
const visited = Array(N).fill(false);

const answer = [];
const dfs = (str, length) => {
  if(length === M) {
    answer.push(str.trim());
    return;
  }

  for(let i=0; i<N; i++) {
    if(!visited[i]){
      visited[i] = true;
      dfs(`${str} ${arr[i]}`, length + 1);
      visited[i] = false;
    }
  }
}

dfs('', 0);

console.log(answer.join('\n'));