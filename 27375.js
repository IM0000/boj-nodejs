// 금공강 사수
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '27375.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n, k] = input[index++].split(' ').map(Number);
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(input[index++].split(' ').map(Number));
}

let count = 0;
recur(0, 0, []);
console.log(count);

function recur(index, sum, registered) {
  if (sum === k) {
    count++;
    return;
  }
  if (sum > k) {
    return;
  }
  if (index === n) {
    return;
  }

  recur(index + 1, sum, registered);

  let [w, s, e] = arr[index];

  if (w !== 5) {
    let credit = e - s + 1;
    let overlap = false;
    for (let j = 0; j < registered.length; j++) {
      let [pw, ps, pe] = registered[j];
      if (w === pw && s <= pe && ps <= e) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      recur(index + 1, sum + credit, [...registered, [w, s, e]]);
    }
  }
}
