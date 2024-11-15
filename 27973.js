const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '27973.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const Q = +input.shift();
const operations = input.slice(0, Q).map((line) => line.split(' ').map(Number));

let add = 0n;
let multiply = 1n;
let offset = 0n;

let minVal = 1n;

const initialSize = 1234567890123n;
let currentSize = initialSize;

const ans = [];

for (const [command, value] of operations) {
  if (command === 0) {
    add += BigInt(value);
  } else if (command === 1) {
    multiply *= BigInt(value);
    add *= BigInt(value);
  } else if (command === 2) {
    currentSize -= BigInt(value);
  } else if (command === 3) {
    let minEffectiveValue = minVal * multiply + add + offset;
    ans.push(minEffectiveValue.toString());
  }

  if (currentSize < initialSize) {
    offset = (initialSize - currentSize) * multiply;
  }
}

console.log(ans.join('\n'));
