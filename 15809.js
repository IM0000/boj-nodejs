// 전국시대
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15809.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
let index = 0;
const [n, m] = input[index++].split(' ').map(Number);
const armies = [];
for (let i = 0; i < n; i++) {
  armies.push(+input[index++]);
}
const root = Array.from({ length: n }, (_, i) => i);

for (let i = 0; i < m; i++) {
  const [O, P, Q] = input[index++].split(' ').map(Number);
  union(O, P - 1, Q - 1);
}

armies.sort((a, b) => a - b);
const remain = armies.filter((item) => item !== 0);
console.log(`${remain.length}\n${remain.join(' ')}`.trim());

function findRoot(k) {
  if (root[k] === k) return k;
  return (root[k] = findRoot(root[k]));
}

function union(O, a, b) {
  let rootA = findRoot(a);
  let rootB = findRoot(b);

  if (rootA === rootB) return;

  if (O === 1) {
    // 동맹
    if (armies[rootA] < armies[rootB]) {
      root[rootA] = rootB;
      armies[rootB] += armies[rootA];
      armies[rootA] = 0;
    } else {
      root[rootB] = rootA;
      armies[rootA] += armies[rootB];
      armies[rootB] = 0;
    }
  } else if (O === 2) {
    // 전쟁
    if (armies[rootA] < armies[rootB]) {
      root[rootA] = rootB;
      armies[rootB] -= armies[rootA];
      armies[rootA] = 0;
    } else {
      root[rootB] = rootA;
      armies[rootA] -= armies[rootB];
      armies[rootB] = 0;
    }
  }
}
