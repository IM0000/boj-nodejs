const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2853.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((x) => x.trim());

const N = +input.shift();

const nums = input.map(Number);

const map = {};
let cnt = 0;
let last = nums[nums.length - 1];
for (let i = 0; i < N; i++) {
  let num = +nums[i];
  map[num - 1] = 1;
}

map[0] = 0;
for (let key in map) {
  if (map[key] == 1) {
    cnt++;

    for (let i = Number(key); i <= last; i += Number(key)) {
      if (map[i] == 1) {
        map[i] = 0;
      }
    }
  }
}

console.log(cnt);
