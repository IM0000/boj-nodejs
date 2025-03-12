// 망가진 키보드
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '6503.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const answer = [];
// m개의 문자로 최대 입력할 수 있는 연속된 문자 갯수
for (let i = 0; i < input.length; i += 2) {
  let m = +input[i].trim();

  if (m == 0) {
    break;
  }

  let st = input[i + 1];

  answer.push(solve(m, st));
}
console.log(answer.join('\n'));

function solve(m, st) {
  let max = 0;
  let map = new Map();
  let left = 0;

  for (let right = 0; right < st.length; right++) {
    let word = st[right];
    map.set(word, (map.get(word) || 0) + 1);

    while (map.size > m) {
      let leftWord = st[left];
      map.set(leftWord, map.get(leftWord) - 1);
      if (map.get(leftWord) === 0) {
        map.delete(leftWord);
      }
      left++;
    }

    max = Math.max(max, right - left + 1);
  }

  return max;
}
