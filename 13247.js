const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '13247.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let board = input[0].split('');
let size = board.length;
let N = +input[1].trim();

const positions = [];
let total = 0;

combination(0, 0, []);

for (let i = 0; i < positions.length; i++) {
  let pos = positions[i];
  let rabbits = Array.from({ length: size }, () => null);

  for (let i = 0; i < pos.length; i++) {
    rabbits[pos[i]] = { prev: null };
  }

  play(rabbits, size);
}

let answer = total / positions.length;
console.log(answer);

function combination(depth, start, arr) {
  if (depth === N) {
    positions.push([...arr]);
    return;
  }

  for (let i = start; i < size; i++) {
    arr.push(i);
    combination(depth + 1, i + 1, arr);
    arr.pop();
  }
}
/* 
= 0번 칸에 있는 토끼는 항상 1번 칸으로 이동한다.
= 게임판의 크기를 size라고 했을 때, size-1이나 size-2에 있는 토끼는 항상 왼쪽에 있는 칸으로 이동한다.
= 나머지 토끼는 현재 자신이 있는 칸의 색상에 따라서 이동할 칸을 결정한다.
  흰색: 왼쪽 칸으로 이동한다
  검정색: 오른쪽 칸으로 이동한다
  빨간색: 아직 한 번도 이동한 적이 없다면, 왼쪽 칸으로 이동한다. 그 외의 경우에는 현재 칸에 오기 전에 있었던 칸으로 이동한다.
= 모든 토끼의 이동이 끝난 후에, 한 마리보다 많은 토끼가 있는 칸에 있는 토끼는 게임에서 제외된다.
= 가장 오른쪽 칸은 게임판에서 사라진다. 즉, 게임판의 크기가 1 감소한다. 위의 규칙에 의하면 가장 오른쪽 칸은 항상 비어있게 된다.
*/
function play(rabbits, gameLen) {
  if (gameLen == 2) {
    if (rabbits[0]) {
      total++;
    }
    if (rabbits[1]) {
      total++;
    }

    return;
  }

  let newRabbits = Array(gameLen);

  for (let i = 0; i < rabbits.length; i++) {
    if (!rabbits[i]) continue;

    let rabbit = rabbits[i];
    let newIndex;

    if (i === 0) {
      newIndex = 1;
    } else if (i === gameLen - 1) {
      newIndex = gameLen - 2;
    } else if (i === gameLen - 2) {
      newIndex = gameLen - 3;
    } else if (board[i] === 'W') {
      newIndex = i - 1;
    } else if (board[i] === 'B') {
      newIndex = i + 1;
    } else if (board[i] === 'R') {
      if (rabbit.prev === null) {
        newIndex = i - 1;
      } else {
        newIndex = i + 1;
      }
    }

    rabbit.prev = i;

    if (newIndex !== undefined) {
      if (newRabbits[newIndex]) {
        newRabbits[newIndex] = null;
      } else {
        newRabbits[newIndex] = rabbit;
      }
    }
  }

  play(newRabbits, gameLen - 1);
}
