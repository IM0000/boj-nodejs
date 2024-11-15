const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30405.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n, m] = input[index++].split(' ').map(Number);
const end = [];
for (let i = 0; i < n; i++) {
  const [c, ...path] = input[index++].split(' ').map(Number);
  end.push(path[0]);
  end.push(path.at(-1));
}
end.sort((a, b) => a - b);
console.log(end[n - 1]);
