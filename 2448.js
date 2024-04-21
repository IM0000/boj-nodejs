const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '';
const input = filePath ? fs.readFileSync(filePath).toString().trim() : '24';
let N = +input;

const map = Array.from(Array(N), () => Array(N*2).fill(' '));

draw(0,N-1,N)

function draw(x,y,n) {
  if(n === 3) {
    map[x][y] = '*';
    map[x+1][y-1] = '*';
    map[x+1][y+1] = '*';
    for(let i=0; i<5; i++) {
      map[x+2][y-2+i] = '*';
    }
    return;
  }
  draw(x, y, n/2);
  draw(x+n/2, y-n/2, n/2);
  draw(x+n/2, y+n/2, n/2);
}

print2DArray(map);
function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(''));
  }
}


let test = 24;
let k = 0;
while(true) {
  if(2 ** k === input / 3) {
    break;
  }
  k++;
}

let answer = ['  *  ', ' * * ', '*****'];

for(let i=0; i<k; i++) {
  let c = 2 ** i;
  for(let j=0; j<3*c; j++) {
    answer.push(answer[j] + ' ' + answer[j]);
  }
  for(let j=0; j<3*c; j++) {
    answer[j] = '   '.repeat(c) + answer[j] + '   '.repeat(c);
  }
}

for(let i=0; i<answer.length; i++) {
  console.log(answer[i]);
}