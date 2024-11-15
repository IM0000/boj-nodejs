const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1406.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let str = input[0].split('');

const ls = [];
const rs = [];

for (let i = 0; i < str.length; i++) {
  ls.push(str[i]);
}

let M = +input[1];

for (let i = 2; i < M + 2; i++) {
  const command = input[i].split(' ');
  const cmd = command[0];

  switch (cmd) {
    case 'L':
      if (ls.length !== 0) {
        rs.push(ls.pop());
      }
      break;
    case 'D':
      if (rs.length !== 0) {
        ls.push(rs.pop());
      }
      break;
    case 'B':
      if (ls.length !== 0) ls.pop();
      break;
    case 'P':
      ls.push(command[1]);
      break;
  }
}
console.log(ls.join('') + rs.reverse().join(''));
