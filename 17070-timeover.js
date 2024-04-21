const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17070.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const N = +input[index++].trim();
const destination = { x: N - 1, y: N - 1 };
const map = Array(N);
// console.log("🚀 ~ file: 17070.js:9 ~ destination:", destination)
const visit = Array.from(Array(N), ()=>Array(N).fill(0));

for (let i = 0; i < N; i++) {
  map[i] = input[index++].split(' ').map(Number);
}

// {x:0, y:1, dir:0}

// 오, 아래, 대각
let dx = [0, 1, 1];
let dy = [1, 0, 1];

let res = 0;
const dfs = (cur) => {
  // console.log(cur);
  visit[cur.x][cur.y]++;
  if (cur.x === destination.x && cur.y === destination.y) {
    res++;
  }

  // 오
  if (cur.dir !== 1) {
    var r = { x: cur.x, y: cur.y + 1, dir: 0 };
    if (r.x < N && r.y < N && map[r.x][r.y] !== 1) {
      dfs(r);
    }
  }
  // 아래
  if (cur.dir !== 0) {
    const d = { x: cur.x + 1, y: cur.y, dir: 1 };
    if (d.x < N && d.y < N && map[d.x][d.y] !== 1) {
      dfs(d);
    }
  }
  // 대각
  const c = { x: cur.x + 1, y: cur.y + 1, dir: 2 };
  if (
    c.x < N &&
    c.y < N &&
    c.x - 1 >= 0 &&
    c.y - 1 >= 0 &&
    map[c.x][c.y] !== 1 &&
    map[c.x - 1][c.y] !== 1 &&
    map[c.x][c.y - 1] !== 1
  ) {
    dfs(c);
  }
};

if(map[destination.x][destination.y] === 1) {
  console.log(0);
} else {
  dfs({ x: 0, y: 1, dir: 0 });
  console.log(res);
}

function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(' '));
  }
}

print2DArray(visit);
