// 닭싸움 팀 정하기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1765.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const n = +input[idx++].trim();
const m = +input[idx++].trim();
const friends = Array.from({ length: n + 1 }, (_, i) => i);
const rank = Array.from({ length: n + 1 }, () => 1);
const enemy = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < m; i++) {
  let [s, a, b] = input[idx++].trim().split(' ');
  if (s === 'F') {
    union(+a, +b);
  } else if (s === 'E') {
    if (enemy[+a].length > 0) {
      let len = enemy[+a].length;
      union(enemy[+a][len - 1], +b);
    }
    enemy[+a].push(+b);
    if (enemy[+b].length > 0) {
      let len = enemy[+b].length;
      union(enemy[+b][len - 1], +a);
    }
    enemy[+b].push(+a);
  }
}
// console.log(friends);
const group = new Set();
for (let i = 1; i <= n; i++) {
  group.add(find(i));
}
console.log(group.size);

function union(a, b) {
  a = find(a);
  b = find(b);

  if (a !== b) {
    if (rank[a] < rank[b]) {
      friends[a] = b;
    } else {
      friends[b] = a;
    }
    if (rank[a] === rank[b]) rank[a]++;
  }
}

function find(x) {
  if (friends[x] !== x) {
    friends[x] = find(friends[x]);
  }
  return friends[x];
}
