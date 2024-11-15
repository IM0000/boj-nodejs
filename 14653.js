const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14653.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [people, message, checkingMessage] = input[0].split(' ').map(Number);
const whoRead = Array.from({ length: message }, () => new Set(['A']));
const notReadCount = [];

for (let i = 0; i < message; i++) {
  const [notRead, sender] = input[i + 1].split(' ');
  notReadCount.push(Number(notRead));

  // 보낸 사람이 A가 아니면 내가 메세지를 보내기 위해서 앞의 모든 메세지를 읽었어야 하므로 앞에 읽은 모든 메세지에 나를 추가
  if (sender !== 'A') {
    for (let j = 0; j < i; j++) {
      whoRead[j].add(sender);
    }
  }

  // 읽지 않은 사람의 숫자가 그대로라면, 직전 상태와 현재 상태가 같다는 의미이다.
  if (i > 0 && notReadCount[i] === notReadCount[i - 1]) {
    whoRead[i] = new Set(whoRead[i - 1]);
  }

  // 현재 메세지를 읽은 사람에 나를 추가
  whoRead[i].add(sender);
}

if (notReadCount[checkingMessage - 1] === 0) {
  console.log(-1);
} else {
  let result = '';
  for (let i = 0; i < people; i++) {
    if (!whoRead[checkingMessage - 1].has(String.fromCharCode(65 + i))) {
      result += String.fromCharCode(65 + i) + ' ';
    }
  }
  console.log(result.trim());
}
