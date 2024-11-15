const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1062.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, k] = input.shift().split(' ').map(Number);
const words = input.map((v) => v.slice(4, -4));
const learned = Array.from({ length: 26 }, () => false);
for (char of 'antic') {
  let idx = char.charCodeAt() - 'a'.charCodeAt();
  learned[idx] = true;
}

// 현재 선택된 글자로 읽을 수 있는 단어
const countReadableWords = (words, learned) => {
  let count = 0;
  for (let word of words) {
    let isReadable = true;
    for (let c of word) {
      let idx = c.charCodeAt() - 'a'.charCodeAt();
      if (!learned[idx]) {
        isReadable = false;
        break;
      }
    }
    if (isReadable) count++;
  }
  return count;
};

let max = 0;
const dfs = (start, count, learned) => {
  if (count === k - 5) {
    max = Math.max(max, countReadableWords(words, learned));
    return;
  }
  for (let i = start; i < 26; i++) {
    if (learned[i]) continue;
    learned[i] = true;
    dfs(i + 1, count + 1, learned);
    learned[i] = false;
  }
};

if (k < 5) {
  console.log(0);
} else {
  dfs(0, 0, learned);
  console.log(max);
}
