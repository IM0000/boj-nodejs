// 줄서기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17178.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input.shift().trim();
let fans = [];
input.forEach((v, i) => {
  fans = fans.concat(v.split(' '));
});

const compare = (a, b) => {
  let [al, an] = a.split('-');
  let [bl, bn] = b.split('-');
  if (al === bl) {
    return +an - +bn;
  }

  return al.charCodeAt() - bl.charCodeAt();
};

const goodOrder = fans.sort(compare);
let last = goodOrder.length;
const wait = [];
let cur = 0;
for (let i = 0; i < n; i++) {
  let line = input[i].split(' ');
  for (let j = 0; j < line.length; j++) {
    let fan = line[j];

    if (goodOrder[cur] === fan) {
      cur++;
    } else {
      while (goodOrder[cur] === wait[wait.length - 1]) {
        wait.pop();
        cur++;
      }

      wait.push(fan);
    }
  }
}

while (cur !== last && goodOrder[cur] === wait[wait.length - 1]) {
  wait.pop();
  cur++;
}

console.log(wait.length > 0 ? 'BAD' : 'GOOD');
