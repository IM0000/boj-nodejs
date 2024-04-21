const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9935.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let s = input[0];
let b = input[1];

// function remove(s, b) {
//   if(s.indexOf(b) > -1) {
//     s = s.replaceAll(b,'');
//   }

//   if(s.indexOf(b) > -1) {
//     return remove(s, b);
//   } else if(s === '') {
//     return 'FRULA';
//   } else {
//     return s;
//   }
// }

function remove(s,b) {
  const stack = [];

  for(let i=0; i<s.length; i++) {
    let curChar = s[i];
    stack.push(curChar);

    if(curChar === b[b.length - 1]) {
      let isEqual = true;

      for(let j=0; j<b.length; j++) {
        if(stack[stack.length-1-j] !== b[b.length-1-j]) {
          isEqual = false;
          break;
        }
      }

      if(isEqual) {
        for(let j=0; j<b.length; j++) {
          stack.pop();
        }
      }
    }
  }

  if(stack.length === 0) {
    return 'FRULA';
  } else {
    return stack.join('');
  }
}

console.log(remove(s,b));