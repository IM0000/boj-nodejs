class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(data) {
    let newNode = new Node(data);

    if(this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  dequeue() {
    let rData = this.front.data;

    this.front = this.front.next;
    this.size--;

    return rData;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16236.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
let N = Number(input[index++]);
let sharkSize = 2;
let time = 0;

const map = [];
for(let i=0; i<N; i++) {
  map.push(input[index++].split(' ').map(Number));
}

const shark = findShark(); // [x,y]
let cnt = 0;
while(true) {
  let eatingList = bfs(shark[0], shark[1], sharkSize);

  if(eatingList.length === 0) {
    console.log(time);
    break;
  }

  let [x, y, move] = eatingList[0]; // 먹을 수 있는 물고기 중 가장 우선순위가 높은 물고기
  cnt++; // 먹은 물고기 수 증가
  map[x][y] = 0; // 먹은 물고기 제거
  time += move; // 시간 증가

  if(cnt === sharkSize) { // 사이즈 증가 조건 만족시 사이즈 증가 후 초기화 및 먹은 물고기 수 초기화
    sharkSize++;
    cnt = 0;
  }

  shark[0] = x;
  shark[1] = y;

}


function bfs(sharkX, sharkY, sharkSize) {
  const visited = Array.from(Array(N), () => new Array(N).fill(false));
  let sharkMoveMap = Array.from(Array(N), () => new Array(N).fill(0));
  let eatingList = [];
  let minMove = Number.MAX_SAFE_INTEGER;

  let queue = new Queue();
  queue.enqueue([sharkX,sharkY]);
  visited[sharkX][sharkY] = true;

  // 상 좌 하 우 순서
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  while(queue.size) {
    let [x, y] = queue.dequeue();

    for(let i=0; i<4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx < 0 || ny < 0 || nx >= N || ny >= N) continue; // 범위 조건
      if(visited[nx][ny]) continue; // 방문 조건
      if(map[nx][ny] > sharkSize) continue; // 사이즈 조건

      // 위 조건 모두 통과하는 경우
      visited[nx][ny] = true;
      queue.enqueue([nx, ny]); // 큐에 추가
      
      sharkMoveMap[nx][ny] = sharkMoveMap[x][y] + 1;
      if(map[nx][ny] !== 0 && map[nx][ny] < sharkSize) {
        minMove = Math.min(minMove, sharkMoveMap[nx][ny]);
        
        if(minMove === sharkMoveMap[nx][ny]) { // 최소 거리 물고기만 추가
          eatingList.push([nx, ny, sharkMoveMap[nx][ny]]);
        }
      }
    }
  }
  
  return eatingList.sort((a,b) => {
    if(a[2] === b[2]) { // 거리가 같으면
      if(a[0] === b[0]) { // 높이(x)가 같으면
        return a[1] - b[1]; // y 오름차순 정렬
      }
      return a[0] - b[0]; // 높이 오름차순 정렬
    }
    return a[2] - b[2]; // 거리 오름차순 정렬
  });
}

function findShark() {
  let shark = [];
  for(let i=0; i<N; i++) {
    for(let j=0; j<N; j++) {
      if(map[i][j] === 9) {
        shark = [i, j];
        map[i][j] = 0;
      }
    }
  }
  return shark;
}

function print2DArray(arr) {
  for(let i=0; i<arr.length; i++) {
    console.log(arr[i]);
  }
}