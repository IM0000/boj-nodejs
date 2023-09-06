// let fs = require('fs');

// let input = fs.readFileSync('1107.txt').toString().trim().split('\r\n');
// // let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
// let N = input[0].trim(); // 목표 채널
// let M = input[1] ? input[1].trim() : ''; // 고장난 버튼 수
// let c; // 고장난 버튼 숫자의 배열

// if(M != 0) {
//     c = input[2].trim().split(' ').join();
// }

const [N, M, nums] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const brokens = nums
  ? nums
    .split(' ')
    .reduce((acc, v) => {
      acc[v] = true;
      return acc;
    }, {})
  : {};

let min = Math.abs(Number(N) - 100); // 100 부터 N까지 +,- 했을 때 횟수

// N - (만들 수 있는 숫자) + (만들 수 있는 숫자의 길이)
// 0 ~ 100만  1억에 1초이므로 가능.

for(var i = 0; i <= 1000000; i++) {
    var target = i + ''; // 문자열로 변환

    for(var j = 0; j < target.length; j++) {
        // if(isBroken(target[j])) {
        //     break;
        // }
        if(brokens[target[j]]) {
            break;
        }

        if(j == target.length - 1) {
            min = Math.min(min, Math.abs(Number(N) - Number(target)) + target.length);
        }
    }
}
console.log(min);

function isBroken(num) {
    if(typeof c == 'undefined') { // 고장난 버튼이 없다면?
        return false;
    } 

    if(c.indexOf(num) > -1) { // 고장난 버튼이면?
        return true;
    }

    return false;
}