const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1043.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
let [N, M] = input[index++].split(' ').map(Number);

let truePerson = Array(N+1).fill(false);

// 진실 아는 사람
let trueArr = input[index++].split(' ').map(Number);
let T = +trueArr[0];
for(let i=1; i<=T; i++) {
  truePerson[trueArr[i]] = true;
}

let party = Array(M);
let parent = Array(N+1);
let rootRank = Array(N+1).fill(1);

for(let i = 0; i <= N; i++) {
  parent[i] = i;
}

for(let i = 0; i < M; i++) {
  party[i] = input[index++].trim().split(' ').map(Number).slice(1);
}

function findRoot(A) {
  if(A === parent[A]) return A;
  return parent[A] = findRoot(parent[A]);
}

function union(A, B) {
  A = findRoot(A);
  B = findRoot(B);

  if(A === B) return;

  if(rootRank[A] < rootRank[B]) parent[A] = B;
  else parent[B] = A;
  
  if(rootRank[A] === rootRank[B]) rootRank[A]++;
}

// 그룹화함
for(let i = 0; i < M; i++) {
  let p1 = party[i][0];
  
  for(let j = 1; j < party[i].length; j++) {
    let p2 = party[i][j];
    union(p1, p2);
  }
}

// 진실을 아는 사람의 그룹을 구함
let rg = new Set();
for(let i = 1; i<truePerson.length; i++) {
  if(truePerson[i]) {
    rg.add(findRoot(parent[i]));
  }
}

let res = 0;
for(let i = 0; i < party.length; i++) {
  let p = party[i];
  let isPossible = true;
  for(let j = 0; j < p.length; j++) {
    
    if(rg.has(findRoot(p[j]))) {
      isPossible = false;
      break;
    }
  }
  if(isPossible) res++;
}

console.log(res);