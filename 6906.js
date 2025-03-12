// Poetry
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '6906.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
let n = +input[idx++].trim();
let cnt = 0;
let rhyme = [];
const answer = [];

while (n) {
  cnt++;
  rhyme.push(input[idx++].split(' ').at(-1));
  if (cnt % 4 === 0) {
    if (
      isRhyme(rhyme[0], rhyme[1]) &&
      isRhyme(rhyme[0], rhyme[2]) &&
      isRhyme(rhyme[0], rhyme[3])
    ) {
      answer.push('perfect');
    } else if (isRhyme(rhyme[0], rhyme[1]) && isRhyme(rhyme[2], rhyme[3])) {
      answer.push('even');
    } else if (isRhyme(rhyme[0], rhyme[2]) && isRhyme(rhyme[1], rhyme[3])) {
      answer.push('cross');
    } else if (isRhyme(rhyme[0], rhyme[3]) && isRhyme(rhyme[1], rhyme[2])) {
      answer.push('shell');
    } else {
      answer.push('free');
    }
    rhyme = [];
    n--;
  }
}

console.log(answer.join('\n'));

function isRhyme(a, b) {
  let rhymeA = getLastSyllable(a).toLowerCase();
  let rhymeB = getLastSyllable(b).toLowerCase();

  if (rhymeA === rhymeB) {
    return true;
  }

  return false;
}

function getLastSyllable(a) {
  let rhyme;
  let vowels = a.match(/[aeiou]/gi);

  if (vowels) {
    let lastIndex = a.lastIndexOf(vowels[vowels.length - 1]);
    rhyme = a.slice(lastIndex);
  } else {
    rhyme = a;
  }

  return rhyme;
}
