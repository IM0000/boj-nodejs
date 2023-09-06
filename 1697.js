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

let [N, K] = require('fs')
//   .readFileSync('/dev/stdin')
  .readFileSync('1697.txt')
  .toString()
  .trim()
  .split(' ');
N = Number(N);
K = Number(K);

// N,K : 0 ~ 100,000
let min = Math.abs(K - N);
var cnt = 0;
var visited = {};

function bfs(n) {
    var queue = new Queue();
    queue.add({x:n, level:0});
    visited[n] = true;

    while( true ) {
        var sb = queue.popleft();
        
        if( sb.x == K ) {
            cnt = sb.level;
            break;
        }

        if(0 <= sb.x*2 && sb.x*2 < 100001 && visited[sb.x*2] != true) {
            queue.add({x: sb.x*2, level: sb.level+1});
            visited[sb.x*2] = true;
        };
        if(0 <= sb.x+1 && sb.x+1 < 100001 && visited[sb.x+1] != true) {
            queue.add({x: sb.x+1, level: sb.level+1});
            visited[sb.x+1] = true;
        };
        if(0 <= sb.x-1 && sb.x-1 < 100001 && visited[sb.x-1] != true) {
            queue.add({x: sb.x-1, level: sb.level+1});
            visited[sb.x-1] = true;
        };
    }

}

if(N < K) {

    bfs(N);
    
    min = Math.min(cnt, min);

}

console.log(min);