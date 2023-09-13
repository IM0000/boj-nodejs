const filePath = process.platform === 'linux' ? '/dev/stdin' : '2630.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n').map(e => e.trim());

// 2차원 배열 만들기
const N = +input.shift();
let coord = [];
input.forEach(e => {
  let inner = e.split(' ').map(Number);
  coord.push(inner);
})

// 블루, 화이트 초기값
let white = 0;
let blue = 0;

// 분할
function partial(row, col, n) {
  // 최종 조건
  if (n === 1) {
    coord[row][col] === 0 ? white++ : blue++;
    return;
  }

  // 첫 좌표 색
  var color = coord[row][col];

  for (var i = row; i < row + n; i++) {
    for (var j = col; j < col + n; j++) {
      if (coord[i][j] != color) { // 색이 다른 것이 있다면 함수 4개 호출 후 종료
        partial(row, col, n / 2);
        partial(row + n / 2, col, n / 2);
        partial(row, col + n / 2, n / 2);
        partial(row + n / 2, col + n / 2, n / 2);
        return;
      }
    }
  }

  // 여기까지 왔다는건 첫 좌표와 색이 모두 동일하다는 뜻
  if (color === 0) white++;
  else blue++;

  return;
}

partial(0, 0, N)
console.log(`${white}\n${blue}`)