const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20303.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [N,M,K] = input[index++].split(' ').map(Number);
const arr = input[index++].split(' ').map(Number);

const parent = Array.from({length: N+1},(_,i)=>i);
const rank = Array.from({length: N+1}, ()=>1);
const friends = Array.from({length: N+1}, ()=>0);
const candies = Array.from({length: N+1}, ()=>0);

for(let i=0; i<M; i++) {
  const [a,b] = input[index++].split(' ').map(Number);
  union(a,b);
  console.log(parent)
}
console.log("🚀 ~ file: 20303.js:20 ~ parent:", parent)

for(let i=1; i<=N; i++) {
  let set = findParent(i);
  friends[set] += 1;
  candies[set] += arr[i-1];
}

let dp = Array.from({length: K}, ()=>0); // K == index명 일 때 최대로 뺏을 수 있는 사탕 수

for(let i=1; i<=N; i++) {
  let friend = friends[i];
  let candy = candies[i];
  if(friend === 0) continue;
  for(let j=K-1; j>=friend; j--) {
    dp[j] = Math.max(dp[j], dp[j-friend] + candy);
  }
}
console.log(dp[K-1]);

function findParent(x) {
  if(x === parent[x]) return x;
  return parent[x] = findParent(parent[x]);
}

function union(a,b) {
  a = findParent(a);
  b = findParent(b);
  
  if(a === b) return;

  if(rank[a] < rank[b]) parent[a] = b;
  else parent[b] = a;

  if(rank[a] === rank[b]) rank[a]++;
}