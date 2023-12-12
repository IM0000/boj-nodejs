const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11404.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const n = +input[index++].trim();
const m = +input[index++].trim();

const d = Array.from(Array(n+1), () => Array(n+1).fill(Infinity));

// 시작점, 도착점 같은 곳은 0으로
for(let i=1; i<=n; i++) {
  d[i][i] = 0;
}

// 초기 노선 업데이트
for(let i=0; i<m; i++) {
  const [a,b,c] = input[index++].split(' ').map(Number);
  d[a][b] = Math.min(d[a][b], c); // 시작, 도착 노선이 같은 경우는 하나가 아닐 수 있다.
}

// 다른 지점 거쳐갈 때랑 비교해서 업데이트
for(let i=1; i<=n; i++) {
  for(let j=1; j<=n; j++) {
    for(let k=1; k<=n; k++) {
      if(i !== j && i !== k && d[j][k] > d[j][i] + d[i][k]) {
        d[j][k] = d[j][i] + d[i][k];
      }
    }
  }
}

// print
const ans = [];
for(var i=1; i<=n; i++) {
  ans.push(d[i].slice(1).join(' ').replaceAll('Infinity', '0').trim());
}
console.log(ans.join('\n'));
