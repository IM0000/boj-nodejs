const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14503.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const [r, c, d] = input[index++].split(' ').map(Number);

const board = [];
for(let i=0; i<N; i++) {
  board.push(input[index++].split(' ').map(Number));
}

let clear = 0;
let dx = [-1,0,1,0];
let dy = [0,1,0,-1];
const dfs = (x, y, d) => {
  if(board[x][y] === 0) {
    board[x][y] = 2;
    clear++;
  }

  for(let i=0; i<4; i++) {
    d = (d+3)%4;
    let nx = x + dx[d];
    let ny = y + dy[d];
    if(board[nx][ny] === 0) {
      dfs(nx, ny, d);
      return;
    }
  }

  if(board[x-dx[d]][y-dy[d]] !== 1) { // 후진
    dfs(x-dx[d], y-dy[d], d);
  }

}

dfs(r, c, d);
console.log(clear);
// console.log(board);


// const fs = require('fs');
// const input = fs.readFileSync('14503.txt').toString().trim().split('\n');

// const [N, M] = input[0].split(' ').map(Number);
// const [r, c, d] = input[1].split(' ').map(Number);
// const map = input.slice(2).map(row => row.split(' ').map(Number));

// const dr = [-1, 0, 1, 0]; // 북, 동, 남, 서
// const dc = [0, 1, 0, -1];

// let cleaned = 0;

// const clean = (r, c, d) => {
//     if (map[r][c] === 0) { // 현재 위치를 청소한다.
//         map[r][c] = 2;
//         console.log("🚀 ~ clean ~ map:", map)
//         cleaned++;
//     }
    
//     let left = (d + 3) % 4; // 현재 방향 기준 왼쪽 방향
    
//     for (let i = 0; i < 4; i++) { // 네 방향 모두 탐색
//         let nr = r + dr[left];
//         let nc = c + dc[left];
        
//         if (map[nr][nc] === 0) { // 청소할 공간이 있으면
//             clean(nr, nc, left); // 그 방향으로 전진하여 청소
//             return;
//         } else { // 청소할 공간이 없으면
//             left = (left + 3) % 4; // 회전
//         }
//     }
    
//     // 네 방향 모두 청소가 이미 되어있거나 벽인 경우
//     let back = (d + 2) % 4; // 현재 방향 기준 후진
//     let br = r + dr[back];
//     let bc = c + dc[back];
    
//     if (map[br][bc] !== 1) { // 후진할 수 있으면
//         clean(br, bc, d); // 후진
//     }
// }

// clean(r, c, d);
// console.log(cleaned);