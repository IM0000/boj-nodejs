const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1991.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const arr = Array.from(Array(N), ()=>{return {}});

for(let i=0; i<N; i++) {
  const [m, l, r] = input[index++].trim().split(' ');
  const arrIdx = m.charCodeAt(0) - 65;
  arr[arrIdx].data = arrIdx;

  if(l !== '.') {
    let lIdx = l.charCodeAt(0) - 65;
    arr[arrIdx].left = arr[lIdx];
  }
  if(r !== '.') {
    let rIdx = r.charCodeAt(0) - 65;
    arr[arrIdx].right = arr[rIdx];
  }
}

function preOrder(obj) {
  if(!obj) {
    return;
  }
  
  temp.push(String.fromCharCode(obj.data+65));
  preOrder(obj.left);
  preOrder(obj.right);
}

let temp = [];
preOrder(arr[0]);
console.log(temp.join(''));

function inOrder(obj) {
  if(!obj) {
    return;
  }

  inOrder(obj.left);
  temp.push(String.fromCharCode(obj.data+65));
  inOrder(obj.right);
}

temp = [];
inOrder(arr[0]);
console.log(temp.join(''));

function postOrder(obj) {
  if(!obj) {
    return;
  }

  postOrder(obj.left);
  postOrder(obj.right);
  temp.push(String.fromCharCode(obj.data+65));
}

temp = [];
postOrder(arr[0]);
console.log(temp.join(''));