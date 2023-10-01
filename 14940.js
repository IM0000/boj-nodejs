const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14940.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

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

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const [n, m] = input.shift().split(' ').map(Number);

let map = [];
input.forEach(e => { map.push(e.split(' ').map(Number)) });

//방문표시
let visit = Array.from(Array(n), () => Array(m).fill(false));
//거리표시
let distance = Array.from(Array(n), () => Array(m).fill(-1));

let queue = new Queue();

for(var i=0; i<n; i++) {
    for(var j=0; j<m; j++) {
        if(map[i][j] == 2) { // 시작위치
            visit[i][j] = true;
            queue.add({x:i,y:j});
            distance[i][j] = 0;
        } else if(map[i][j] == 0) { // 벽 설정
            visit[i][j] = true;
            distance[i][j] = 0;
        }
    }
}

bfs();
let answer = distance.map(e=>e.join(' ')).join('\n');
console.log(answer);

function bfs() {
    while(queue.size() !== 0) {
        let {x,y} = queue.popleft();

        for(var i=0; i<4; i++) {
            let nx = x+dx[i];
            let ny = y+dy[i];

            // 범위 설정
            if(nx<0 || nx>=n || ny<0 || ny>=m) continue;

            // 벽은 위에서 셋팅함
            if(map[nx][ny] == 0) continue;

            // 방문 X, 접근가능한 곳
            if(!visit[nx][ny] && map[nx][ny] == 1) {
                visit[nx][ny] = true; // 방문처리
                queue.add({x:nx,y:ny}); // 큐에 넣기
                distance[nx][ny] = distance[x][y] + 1; // 거리 저장(이전 위치의 거리 + 1)
            }
        }
    }
}

