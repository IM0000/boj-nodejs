// 동전 교환
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1532.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

/* 세준이의 금화 1개를 은화 9개로 교환
세준이의 은화 11개를 금화 1개로 교환
세준이의 은화 1개를 동화 9개로 교환
세준이의 동화 11개를 은화 1개로 교환 */

// *동화부터 채워야 교환횟수가 적어짐
let [G1, S1, B1] = input[0].split(' ').map(Number);
let [G2, S2, B2] = input[1].split(' ').map(Number);

let Surplus_G = G1 - G2;
let Surplus_S = S1 - S2;
let Surplus_B = B1 - B2;

let Exchanges = 0;

function exchange_B_to_S() {
  if (Surplus_B >= 11) {
    Surplus_B -= 11;
    Surplus_S += 1;
    Exchanges += 1;
    return true;
  }
  return false;
}

function exchange_S_to_B() {
  if (Surplus_S >= 1) {
    Surplus_S -= 1;
    Surplus_B += 9;
    Exchanges += 1;
    return true;
  }
  return false;
}

function exchange_S_to_G() {
  if (Surplus_S >= 11) {
    Surplus_S -= 11;
    Surplus_G += 1;
    Exchanges += 1;
    return true;
  }
  return false;
}

function exchange_G_to_S() {
  if (Surplus_G >= 1) {
    Surplus_G -= 1;
    Surplus_S += 9;
    Exchanges += 1;
    return true;
  }
  return false;
}

while (Surplus_G < 0 || Surplus_S < 0 || Surplus_B < 0) {
  let progressed = false;

  // 동화 부족분 처리
  if (Surplus_B < 0) {
    // 은화를 동화로 교환
    if (exchange_S_to_B()) {
      progressed = true;
    }
    // 금화를 은화로 교환 후 동화로 교환
    else if (exchange_G_to_S()) {
      progressed = true;
    } else {
      console.log(-1);
      process.exit(0);
    }
  }
  // 은화 부족분 처리
  else if (Surplus_S < 0) {
    // 금화를 은화로 교환
    if (exchange_G_to_S()) {
      progressed = true;
    }
    // 동화를 은화로 교환
    else if (exchange_B_to_S()) {
      progressed = true;
    } else {
      console.log(-1);
      process.exit(0);
    }
  }
  // 금화 부족분 처리
  else if (Surplus_G < 0) {
    // 은화를 금화로 교환
    if (exchange_S_to_G()) {
      progressed = true;
    }
    // 동화를 은화로 교환하여 금화로 교환
    else if (exchange_B_to_S()) {
      progressed = true;
    } else {
      console.log(-1);
      process.exit(0);
    }
  }
  if (!progressed) {
    console.log(-1);
    process.exit(0);
  }
}

// 모든 부족분이 채워졌으면 교환 횟수 출력
console.log(Exchanges);
