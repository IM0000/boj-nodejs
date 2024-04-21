const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17144.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const [R,C,T] = input[index++].split(' ').map(Number);

let add = Array.from(Array(R), ()=>Array(C).fill(0));
let map = Array(R);
let airCleaner = [];
for(let i=0; i<R; i++) {
  let row = input[index++].split(' ').map(Number);
  if(row.indexOf(-1) > -1) airCleaner.push(i);
  map[i] = row;
}

function blow(airCleaner) {
  let top = airCleaner[0];
  let bot = airCleaner[1];

  for(let r = top-1; r > 0; r--) {
    map[r][0] = map[r-1][0];
  }
  
  let tmp1 = map[1][C-1];
  map[0] = [...map[0].slice(1), tmp1];

  for(let r = 1; r < top; r++) {
    map[r][C-1] = map[r+1][C-1];
  }
  
  map[top].pop();
  map[top] = [-1, 0, ...map[top].slice(1)];

  //--------------------------------------

  for(let r = bot+1; r < R-1; r++) {
    map[r][0] = map[r+1][0];
  }

  let tmp2 = map[R-2][C-1];
  map[R-1] = [...map[R-1].slice(1), tmp2];

  for(let r = R-2; r > bot; r--) {
    map[r][C-1] = map[r-1][C-1];
  }

  map[bot].pop();
  map[bot] = [-1, 0, ...map[bot].slice(1)];
}

function diffusion() {
  let dx = [0,0,-1,1];
  let dy = [-1,1,0,0];
  let list = [];

  for(let i=0; i<R; i++) {
    for(let j=0; j<C; j++) {
      if(map[i][j] !== 0 && map[i][j] !== -1) {
        list.push({x:i,y:j});
      }
    }
  }
  
  for(let i=0; i<list.length; i++) {
    let cx = list[i].x;
    let cy = list[i].y;
    let dCnt = 0;
    for(let z=0; z<4; z++) {
      let nx = cx + dx[z];
      let ny = cy + dy[z];
  
      if(nx>=0 && nx<R && ny>=0 && ny<C && map[nx][ny] !== -1) {
        dCnt+=1;
        add[nx][ny] += Math.floor(map[cx][cy]/5);
      }
    }
    add[cx][cy] -= (Math.floor(map[cx][cy]/5)*dCnt);
  }
}

function update() {
  for(let i=0; i<R; i++) {
    for(let j=0; j<C; j++) {
      map[i][j] = map[i][j] + add[i][j];
      add[i][j] = 0;
    }
  }
}

function sum() {
  let sum = 0;
  for(let i=0; i<R; i++) {
    for(let j=0; j<C; j++) {
      if(map[i][j] !== -1) {
        sum += map[i][j];
      }
    }
  }
  return sum;
}

let res;
for(let i=0; i<T; i++) {
  diffusion();
  update();
  blow(airCleaner);
}
res = sum();

console.log(res);

// print2DArray(map);
function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join('  '));
  }
}