const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15444.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const str = input[1].trim();
const map = { A: 0, B: 1, C: 2, D: 3, E: 4 };
const arr = [
  ['***', '***', '***', '***', '***'],
  ['*.*', '*.*', '*..', '*.*', '*..'],
  ['***', '***', '*..', '*.*', '***'],
  ['*.*', '*.*', '*..', '*.*', '*..'],
  ['*.*', '***', '***', '***', '***'],
];

const answer = [];
for (let i = 0; i < 5; i++) {
  let strList = str.split('');
  let ans = '';
  for (let j = 0; j < strList.length; j++) {
    ans += arr[i][map[strList[j]]];
  }
  answer.push(ans);
}
console.log(answer.join('\n'));
