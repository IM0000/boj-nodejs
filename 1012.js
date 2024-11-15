let fs = require('fs');

class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  add(value) {
    if (this.size() === 0) {
      this.storage['0'] = value;
    } else {
      this.rear += 1;
      this.storage[this.rear] = value;
    }
  }

  popleft() {
    let temp;
    if (this.front === this.rear) {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front = 0;
      this.rear = 0;
    } else {
      temp = this.storage[this.front];
      delete this.storage[this.front];
      this.front += 1;
    }
    return temp;
  }
}

// let input = fs.readFileSync('1012.txt').toString().trim().split('\r\n');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
input = input.slice(1);

for (let i = 0; i < input.length; i++) {
  let value = input[i];

  if (value.split(' ').length == 3) {
    let m = Number(value.split(' ')[0]);
    let n = Number(value.split(' ')[1]);
    let k = Number(value.split(' ')[2]);
    let kArr = input.slice(i + 1, i + 1 + k);
    i = i + k;

    let numOfWorm = getNumOfWorm(m, n, kArr);

    console.log(numOfWorm); // 정답 출력
  }
}

function getNumOfWorm(m, n, arr) {
  let dx = [0, 1, 0, -1];
  let dy = [1, 0, -1, 0];
  let cnt = 0;

  let matrix = new Array(n).fill(0).map(() => new Array(m).fill(0));
  let visited = new Array(n).fill(false).map(() => new Array(m).fill(false));

  // 배추 위치 -1 넣음
  arr.forEach((element) => {
    let x = Number(element.split(' ')[0].trim());
    let y = Number(element.split(' ')[1].trim());
    matrix[y][x] = -1;
  });

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] == -1) {
        // bfs
        let q = new Queue();
        q.add({ x: x, y: y });
        cnt++;

        while (q.size() != 0) {
          let cq = q.popleft();
          let cx = cq.x;
          let cy = cq.y;
          matrix[cy][cx] = cnt;
          visited[cy][cx] = true;

          for (let i = 0; i < dx.length; i++) {
            let nx = cx + dx[i];
            let ny = cy + dy[i];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
              if (matrix[ny][nx] == -1 && visited[ny][nx] == false) {
                visited[ny][nx] = true;
                q.add({ x: nx, y: ny });
              }
            }
          }
        }
      }
    }
  }

  // print2DArrayAsPlane(matrix);

  return cnt;
}

function print2DArrayAsPlane(arr) {
  let height = arr.length;
  let width = arr[0].length;
  // 2차원 배열을 평면에 출력
  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      row += arr[y][x] + ' ';
    }
    console.log(row);
  }
}
