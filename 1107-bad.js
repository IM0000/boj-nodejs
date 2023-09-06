let fs = require('fs');

let input = fs.readFileSync('1107.txt').toString().trim().split('\r\n');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let N = input[0].trim(); // 목표 채널
let M = input[1].trim(); // 고장난 버튼 수
let c; // 고장난 버튼 숫자의 배열
if(M != 0) {
    c = input[2].split(' ').join();
}

let s = Math.abs(Number(N) - 100);
let numberArr = [0,1,2,3,4,5,6,7,8,9];

// 사용 가능한 번호만 남기기
if(M && c) {
    for(var i = 0; i < c.length; i++) {
        for(let j = 0; j < numberArr.length; j++) {
            if(numberArr[j] === Number(c[i])) {
                numberArr.splice(j, 1);
                j--;
            }
        }
    }
}

var tmpNum0 = '', tmpNum1 = '', tmpNum11 = '', tmpNum2 = '';

for(var i = 0; i < N.length; i++) {
    var nb = N.charAt(i);
    var min = 99;
    var tmpN = '';
    
    // tmpNum1
    for(var j = 0; j < numberArr.length; j++) {
        var diff = Math.abs(Number(nb) - Number(numberArr[j]));
        if(diff <= min) {
            min = diff;
            tmpN = numberArr[j];
        }
    }
    
    tmpNum1 += tmpN;
    min = 99;
    tmpN = '';

    // tmpNum11
    if(nb == 0) {
        nb = '10'; // 0은 10으로 간주
    }

    for(var j = 0; j < numberArr.length; j++) {
        var diff = Math.abs(Number(nb) - Number(numberArr[j]));
        if(diff <= min) {
            min = diff;
            tmpN = numberArr[j];
        }
    }

    tmpNum11 += tmpN;
    min = 99;
    tmpN = '';

    if(i > 0 && N.length > 1) { // 첫째 자릿수 제외한 결과

        if(nb == 0) {
            nb = '10'; // 0은 10으로 간주
        }

        for(var j = 0; j < numberArr.length; j++) {
            var diff = Math.abs(Number(nb) - Number(numberArr[j]));
            if(diff <= min) {
                min = diff;
                tmpN = numberArr[j];
            }
        }
    }

    tmpNum2 += tmpN;
}

tmpNum1 = tmpNum1.charAt(0) == '0' ? '0' : tmpNum1
tmpNum11 = tmpNum11.charAt(0) == '0' ? '0' : tmpNum11
tmpNum2 = tmpNum2.charAt(0) == '0' ? '0' : tmpNum2

console.log(tmpNum1, '##', tmpNum11, '##', tmpNum2, '##', s);
var cnt1 = Math.abs(Number(N - tmpNum1)) + tmpNum1.length;
var cnt11 = Math.abs(Number(N - tmpNum11)) + tmpNum11.length;
var cnt2 = Math.abs(Number(N - tmpNum2)) + tmpNum2.length;

var cnt1 = Math.min(cnt1, cnt11);
var cnt = Math.min(cnt1, cnt2);

if(tmpNum2 == '') { // 예외케이스
    cnt = cnt1;
}

var answer = Math.min(cnt, s);

if(tmpNum1 == '' && tmpNum11 == '' && tmpNum2 == '') { // 예외케이스
    answer = s;
}

console.log(answer); // 출력
