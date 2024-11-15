const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15720.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [B, C, D] = input[0].split(' ').map(Number);
const min = Math.min(B, C, D);

const buggers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);
const sides = input[2]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);
const drinks = input[3]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);

function calculateTotals(items, min) {
  let total = 0;
  let discountTotal = 0;

  items.forEach((x, i) => {
    total += x;
    discountTotal += i < min ? x * 0.9 : x;
  });

  return { total, discountTotal };
}

let tot = 0;
let discountTot = 0;

[buggers, sides, drinks].forEach((items) => {
  const { total, discountTotal } = calculateTotals(items, min);
  tot += total;
  discountTot += discountTotal;
});

console.log(tot);
console.log(discountTot);
