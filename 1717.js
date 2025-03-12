// 집합의 표현
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1717.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const parents = Array.from({ length: n + 1 }, (_, i) => i);
const rank = Array.from({ length: n + 1 }, () => 1);

const answer = [];

for (let i = 1; i <= m; i++) {
  const [cmd, a, b] = input[i].split(' ').map(Number);

  if (cmd === 0) {
    union(a, b);
  } else {
    let ta = find(a);
    let tb = find(b);
    if (ta === tb) {
      answer.push('YES');
    } else {
      answer.push('NO');
    }
  }
}

console.log(answer.join('\n'));

function find(a) {
  if (parents[a] !== a) {
    return (parents[a] = find(parents[a]));
  }
  return parents[a];
}

function union(a, b) {
  a = find(a);
  b = find(b);

  if (a === b) {
    return;
  }

  if (rank[a] > rank[b]) {
    parents[b] = a;
  } else {
    parents[a] = b;
  }

  if (rank[a] === rank[b]) {
    rank[b]++;
  }
}
