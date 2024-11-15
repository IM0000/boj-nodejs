// 격자의 분리자
const fs = require('fs');

// 입력을 읽어옵니다.
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2288.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let idx = 0;
let output = '';

while (idx < input.length) {
  // 각 테스트 케이스의 N과 M을 읽어옵니다.
  const [nStr, mStr] = input[idx++].split(' ');
  const n = parseInt(nStr);
  const m = parseInt(mStr);

  // N과 M이 0이면 입력 종료
  if (n === 0 && m === 0) {
    break;
  }

  // 보드를 읽어옵니다.
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(input[idx++].trim().split(''));
  }

  // Java 코드의 보드 수정 로직을 구현합니다.
  for (let i = 0; i < n; i++) {
    for (let j = m - 1; j >= 0; j--) {
      if (board[i][j] === 'S') {
        if (j === 0 || j === m - 1) {
          if (j + 1 < m - 1) {
            // j < m - 2
            board[i][j + 1] = 'S';
            break;
          }
        } else {
          if (j + 1 < m) {
            board[i][j + 1] = 'S';
            break;
          }
        }
      }
    }
  }

  // 시작 위치(첫 행의 1부터 m-2 열까지)를 수집합니다.
  const queue = [];
  let front = 0; // 큐의 시작 인덱스
  const visited = Array.from({ length: n }, () => Array(m).fill(false));

  for (let j = 1; j < m - 1; j++) {
    if (board[0][j] === 'S') {
      queue.push([0, j, 1]); // [x, y, steps]
      visited[0][j] = true;
    }
  }

  // 이동할 수 있는 방향: 왼쪽, 아래, 오른쪽
  const directions = [
    [0, -1], // 왼쪽
    [1, 0], // 아래
    [0, 1], // 오른쪽
  ];

  let res = 0;

  // BFS 탐색
  while (front < queue.length) {
    const [x, y, steps] = queue[front++];

    // 현재 위치가 마지막 행이면 결과 업데이트 후 탐색 종료
    if (x === n - 1) {
      res = steps;
      break;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // 유효한 좌표이고, 'S'이며, 방문하지 않은 경우
      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < m &&
        board[nx][ny] === 'S' &&
        !visited[nx][ny]
      ) {
        queue.push([nx, ny, steps + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  // 결과를 출력 형식에 맞게 저장
  output += (res === 0 ? 0 : res) + '\n';
}

// 모든 테스트 케이스의 결과를 출력
console.log(output.trim());
