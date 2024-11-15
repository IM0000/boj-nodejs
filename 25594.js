var map = {
  a: 'aespa',
  b: 'baekjoon',
  c: 'cau',
  d: 'debug',
  e: 'edge',
  f: 'firefox',
  g: 'golang',
  h: 'haegang',
  i: 'iu',
  j: 'java',
  k: 'kotlin',
  l: 'lol',
  m: 'mips',
  n: 'null',
  o: 'os',
  p: 'python',
  q: 'query',
  r: 'roka',
  s: 'solvedac',
  t: 'tod',
  u: 'unix',
  v: 'virus',
  w: 'whale',
  x: 'xcode',
  y: 'yahoo',
  z: 'zebra',
};
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '25594.txt';
const input = fs.readFileSync(filePath).toString().trim();

let s = 0;
let result = '';
let error = false;
for (let i = 0; i < input.length; i++) {
  let ch = input[i];
  let len = map[ch].length;
  if (map[ch] == input.substring(i, i + len)) {
    result += ch;
    i += len - 1;
  } else {
    error = true;
    break;
  }
}
if (error) {
  console.log('ERROR!');
} else {
  console.log(`It's HG!\n${result}`);
}
