let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '9527.txt';
let [a,b] = fs.readFileSync(filePath).toString().trim()
.split(" ").map((v)=>BigInt(v));

//(2**i)-1 까지의 1의 개수를 저장
let p = Array(60).fill(0);
p[1] = 1;
for (let i=2; i<=60; i++){
  p[i] = 2**(i-1) + 2*p[i-1];
}
p = p.map((v)=>BigInt(v));
console.log("🚀 ~ file: 9527.js:13 ~ p:", p)

function sol(num){
  let count = 0n;
  let bit = num.toString(2);
  let bitlen = bit.length;

  for (let i=0; i<bitlen; i++){
    if (bit[i]=='1'){
      let pow = BigInt(bitlen-i-1);
      count += BigInt(p[pow]);
      count += (num - 2n**pow + 1n);
      num = num - 2n**pow;
    }
  }
  return count;

}
let answer = sol(b)-sol(a-1n)
console.log(""+answer);