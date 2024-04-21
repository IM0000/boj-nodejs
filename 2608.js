const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2608.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N1 = input[0].trim();
const N2 = input[1].trim();

/* 
기호	I	V	X	L	C	D	M
값	1	5	10	50	100	500	1000 
*/
const roma = ['M', 'D', 'C', 'L', 'X', 'V', 'I', 'IV', 'IX', 'XL', 'XC', 'CD', 'CM'];
const ara = [1000, 500, 100, 50, 10, 5, 1, 4, 9, 40, 90, 400, 900];

let sum = romaToAra(N1) + romaToAra(N2);
console.log(sum);
console.log(araToRoma(sum));

// console.log(romaToAra('DCXLV'));
// console.log(araToRoma(645));

/* 
DLIII = 500 + 50 + 3 = 553
MCMXL = 1000 + 900 + 40 = 1940
*/
function romaToAra(str) {
  let sum = 0;
  if(str.length == 1) {
    return ara[roma.indexOf(str)];
  }

  let addTask = true;
  for(let i=0; i<str.length-1; i++) {
    let s = str[i];
    let ss = str[i+1];
    
    if(roma.indexOf(s) > roma.indexOf(ss)) {
      sum += ara[roma.indexOf(s+ss)];
      if(i == str.length-2) addTask = false;
      i+=1;
    } else {
      sum += ara[roma.indexOf(s)];
    }
  }

  if(addTask) {
    sum += ara[roma.indexOf(str[str.length-1])];
  }

  return sum;
}

/* 
235 = CCXXXV
2493 = MMCDXCIII
*/
function araToRoma(num) {
  let str = '';
  let t = Math.floor(num/1000);
  let h = Math.floor((num%1000)/100);
  let hh, hhh;
  if(h > 5 && h < 9) {
    hhh = roma[ara.indexOf(5*100)];
    h = h-5;
  }
  if(ara.indexOf(h*100) > -1) {
    hh = roma[ara.indexOf(h*100)];
  }
  let te = Math.floor((num%100)/10);
  let tete, tetete;
  if(te > 5 && te < 9) {
    tetete = roma[ara.indexOf(5*10)];
    te = te-5;
  }
  if(ara.indexOf(te*10) > -1) {
    tete = roma[ara.indexOf(te*10)];
  }
  let o = num%10;
  let oo, ooo;
  if(o > 5 && o < 9) {
    ooo = roma[ara.indexOf(5)];
    o = o-5;
  }
  if(ara.indexOf(o) > -1) {
    oo = roma[ara.indexOf(o)];
  }

  if(t) str += 'M'.repeat(t);

  if(hhh) str += hhh;
  if(hh) str += hh;
  else str += 'C'.repeat(h);

  if(tetete) str += tetete;
  if(tete) str += tete;
  else str += 'X'.repeat(te);

  if(ooo) str += ooo;
  if(oo) str += oo;
  else str += 'I'.repeat(o);

  return str;
}