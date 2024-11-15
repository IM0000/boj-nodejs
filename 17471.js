const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17471.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const n = +input[index++].trim();
let pp = input[index++].trim().split(' ').map(Number);
pp = [0, ...pp];
const graph = Array.from(Array(n + 1), () => []);
for (let i = 1; i <= n; i++) {
  const arr = input[index++].trim().split(' ').map(Number);
  arr.shift();
  for (const neighbor of arr) {
    graph[i].push(neighbor);
    graph[neighbor].push(i);
  }
}

// 경우의수구하기
const teams = [];
const team = [];
function dfs(count, t) {
  if (team.length > 0) {
    teams.push([...team]);
  }
  if (count >= Math.floor(n / 2)) {
    return;
  }

  for (let i = t; i <= n; i++) {
    team.push(i);
    dfs(count + 1, i + 1);
    team.pop();
  }
}
dfs(0, 1);

let binarySplit = false;
const total = pp.reduce((a, b) => a + b, 0);
let min = Number.MAX_VALUE;

for (const team of teams) {
  if (isValid(team)) {
    binarySplit = true;
    const sum = team.reduce((a, b) => a + pp[b], 0);
    min = Math.min(min, Math.abs(total - 2 * sum));
  }
}

console.log(binarySplit ? min : -1);

function bfs(start, visited) {
  const queue = [start];
  visited[start] = 1;

  while (queue.length) {
    const current = queue.shift();
    for (const next of graph[current]) {
      if (visited[next] === 0) {
        visited[next] = 1;
        queue.push(next);
      }
    }
  }
}

function isValid(team) {
  const other = [];
  for (let i = 1; i <= n; i++) {
    if (!team.includes(i)) {
      other.push(i);
    }
  }

  let visited = Array(n + 1).fill(0);
  other.forEach((member) => (visited[member] = 1));
  bfs(team[0], visited);

  for (const member of team) {
    if (visited[member] === 0) return false;
  }

  visited = Array(n + 1).fill(0);
  team.forEach((member) => (visited[member] = 1));
  bfs(other[0], visited);

  for (const member of other) {
    if (visited[member] === 0) return false;
  }

  return true;
}
