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

class Node {
    constructor(data) {
        this.data = data;
        this.marked = false;
        this.abjacent = new Array();
    }
}

class Graph {
    constructor(N) {
        this.nodes = new Array(N);
        for(var i=0; i<N; i++) {
            this.nodes[i] = new Node(i+1);
        }
        // console.log(this.nodes);
    }
    addEdge(a,b) {
        var a = this.nodes[a-1];
        var b = this.nodes[b-1];
        if(!a.abjacent.some(element => element.data == b.data)) {
            a.abjacent.push(b.data-1); // node 인덱스 저장
        }
        if(!b.abjacent.some(element => element.data == a.data)) {
            b.abjacent.push(a.data-1); // node 인덱스 저장
        }
    }
    bfs(d) {
        if(!d) d = 0;

        if(this.nodes[d].marked) {
            // console.log('###########1');
            // console.log(this.nodes);
            // console.log('###########2');
            return 0;
        }
        var q = new Queue();
        this.nodes[d].marked = true;
        q.add(this.nodes[d])

        while(q.size() != 0) {
            var check = q.popleft();
            // console.log(check)
            for(var i=0; i<check.abjacent.length; i++) {
                if(!this.nodes[check.abjacent[i]].marked) {
                    this.nodes[check.abjacent[i]].marked = true;
                    q.add(this.nodes[check.abjacent[i]]);
                }
            }
            
        }
        
        // console.log(this.nodes);
        return 1;
    }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : '11724.txt';
let txt = require('fs')
    .readFileSync(filePath)
    // .readFileSync('11724.txt')
    .toString().trim();

let [N, M] = txt.split('\n')[0].split(' ');
let uvList = txt.split('\n').slice(1);

let g = new Graph(N);

for(let i=0; i<M; i++) {
    let u = Number(uvList[i].split(' ')[0].trim());
    let v = Number(uvList[i].split(' ')[1].trim());
    g.addEdge(u,v);
}
// console.log(g.nodes);
let answer = 0;

for(let i=0; i<N; i++) {
    answer += g.bfs(i);
}

console.log(answer);