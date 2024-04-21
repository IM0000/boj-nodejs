const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2504.txt';
const input = fs.readFileSync(filePath).toString().trim();

// (()[[]])([]) 
// 2*(2+3*3)+2*3 = 28

let answer = 0;
let temp = 1;
let stack = [];
for(let i=0; i<input.length; i++) {
  let s = input.charAt(i);

  if(s == '(') {
    temp *= 2;
    stack.push('(');
  } else if(s == ')') {
    if(stack.length == 0 || stack[stack.length-1] != '(') {
      answer = 0;
      break;
    }
    if(input[i-1] == '(') {
      answer += temp;
      temp /= 2;
      stack.pop();
    } else {
      temp /= 2;
      stack.pop();
    }
  } else if(s == '[') {
    temp *= 3;
    stack.push('[');
  } else if(s == ']') {
    if(stack.length == 0 || stack[stack.length-1] != '[') {
      answer = 0;
      break;
    }
    if(input[i-1] == '[') {
      answer += temp;
      temp /= 3;
      stack.pop();
    } else {
      temp /= 3;
      stack.pop();
    }
  }
}

if(stack.length != 0) answer = 0;

console.log(answer);