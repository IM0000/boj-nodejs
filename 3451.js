const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3451.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const answer = Array.from({ length: 9 }, (_, i) => [
  String.fromCharCode(i + 65),
  0,
  0,
  0,
]);

// 62개 팀
const map = {};
for (let i = 1; i <= n; i++) {
  const [s, t, p, r] = input[i].split(' ');
  let idx = p.charCodeAt() - 65;

  if (!map[t]) {
    map[t] = {
      sArr: Array(9).fill(0), // 시간
      rArr: Array(9).fill(false), // 결과
      tArr: Array(9).fill(0), // 횟수
    };
  }

  if (map[t].rArr[idx]) {
    continue;
  }

  map[t].tArr[idx]++;

  if (r == 'A') {
    map[t].rArr[idx] = true;
    map[t].sArr[idx] = +s;
  }
}

for (let i = 0; i < answer.length; i++) {
  let problem = answer[i][0];
  let problemIdx = problem.charCodeAt() - 65;

  for (let key in map) {
    if (map[key].rArr[problemIdx]) {
      answer[i][1]++;
      answer[i][2] += +map[key].tArr[problemIdx];
      answer[i][3] += +map[key].sArr[problemIdx];
    }
  }

  if (answer[i][1] !== 0) {
    answer[i][2] = parseFloat(answer[i][2] / answer[i][1]).toFixed(2);
    answer[i][3] = parseFloat(answer[i][3] / answer[i][1]).toFixed(2);
  } else {
    answer[i][2] = '';
    answer[i][3] = '';
  }
}
console.log(answer.map((v) => v.join(' ')).join('\n'));
