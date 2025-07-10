const input = require('fs')
  .readFileSync('6568.txt', 'utf-8')
  .trim()
  .split('\n');

const testCase = [];
for (let i = 0; i < input.length; i += 32) {
  testCase.push(input.slice(i, i + 32));
}

const answer = [];

for (test of testCase) {
  let pc = 0;
  let adder = 0;
  let temp;
  let isEnd = false;

  while (true) {
    let [curC, curO] = splitCmd(test[pc]);
    let intO = parseInt(curO, 2);

    pc = (pc + 1) % 32;
    switch (curC) {
      case '000':
        test[intO] = adder.toString(2).padStart(8, '0');
        break;
      case '001':
        adder = parseInt(test[intO], 2);
        break;
      case '010':
        if (adder == 0) {
          pc = intO;
        }
        break;
      case '011':
        break;
      case '100':
        temp = adder - 1;
        if (temp < 0) temp += 256;
        adder = temp;
        break;
      case '101':
        temp = adder + 1;
        temp = temp % 256;
        adder = temp;
        break;
      case '110':
        pc = intO;
        break;
      case '111':
        let result = adder.toString(2).padStart(8, '0');
        answer.push(result);
        isEnd = true;
        break;
    }
    if (isEnd) break;
  }
}

console.log(answer.join('\n'));

function splitCmd(str) {
  let cmd = str.slice(0, 3).trim();
  let operand = str.slice(3, 8).trim();
  return [cmd, operand];
}
