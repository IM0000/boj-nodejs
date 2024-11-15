const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '19583.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [s, e, ee] = input.shift().split(' ');
const attendee = {};

for (let i = 0; i < input.length; i++) {
  const [time, name] = input[i].split(' ');

  if (time.replace(':', '') <= s.replace(':', '')) {
    attendee[name] = 1;
  }

  if (
    e.replace(':', '') <= time.replace(':', '') &&
    time.replace(':', '') <= ee.replace(':', '')
  ) {
    if (attendee[name] === 1) {
      attendee[name] = 2;
    }
  }
}

let answer = 0;
Object.entries(attendee).forEach(([key, value]) => {
  if (value === 2) {
    answer++;
  }
});
console.log(answer);
