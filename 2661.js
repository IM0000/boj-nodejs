const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2661.txt';
const input = +fs.readFileSync(filePath).toString().trim();

let answer = '';
recur(1, [1]);
console.log(answer);

function recur(cnt, seq) {
  if(!inspect(seq)) {
    return;
  }

  if(cnt === input) {
    answer = seq.join('');
    console.log(answer);
    process.exit();
  }

  for(let i = 1; i <= 3; i++) {
    seq.push(i);
    recur(cnt+1, seq);
    seq.pop();
  }
}

// false: 나쁜수열, true: 좋은수열
function inspect(seq) {
  let len = seq.length;

  for(let i = 1; i <= len/2; i++) {
    let isBad = true;
    for(let j = 1; j <= i; j++) {
      let e = len - j;
      let s = e - i;
      if(seq[e] != seq[s]) {
        isBad = false;
        break;
      }
    }
    if(isBad) {
      return false;
    }
  }

  return true;
}
