let fs = require('fs');

let input = fs.readFileSync('1074.txt').toString().trim().split(' ');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let N = input[0];
let r = input[1];
let c = input[2];

function sol(N, r, c) {
    if(N == 0) {
        return 0;
    }

    return 2*(r%2) + (c%2) + 4*sol(N-1, parseInt(r/2), parseInt(c/2));
}

console.log(sol(N,r,c));

// let answer = 0;

// while (N != 0) {
//     N -= 1;

//     // 2사분면
//     if(r < 2 ** N && c < 2 ** N) {
//         answer += (2 ** N) * (2 ** N) * 0;
//     } // 1사분면 
//     else if(r < 2 ** N && c >= 2 ** N) {
//         answer += (2 ** N) * (2 ** N) * 1;
//         c -= (2 ** N);
//     } // 3사분면 
//     else if(r >= 2 ** N && c < 2 ** N) {
//         answer += (2 ** N) * (2 ** N) * 2;
//         r -= (2 ** N);
//     } // 4사분면 
//     else {
//         answer += (2 ** N) * (2 ** N) * 3;
//         c -= (2 ** N);
//         r -= (2 ** N);
//     }
// }

// console.log(answer);



// let n = Math.pow(2,N);
// let table = new Array(n).fill(0).map(() => new Array(n).fill(0));

// let dx = [0,1,0,1];
// let dy = [0,0,1,1];

// recur(N,0,0);
// print2DArrayAsPlane(table);

// function recur(N,x,y) {
//     if(N == 1) {
//         for(var i = 0; i < dx.length; i++) {
//             var nx = x + dx[i];
//             var ny = y + dy[i];
//             // console.log('## '+cnt);
//             table[ny][nx] = cnt++;
//             // console.log('### ' + cnt);
//         }
//         return;
//     }

//     recur(N/2,x+0,              y+0);
//     recur(N/2,x+Math.pow(2,N-1),y+0);
//     recur(N/2,x+0,              y+Math.pow(2,N-1));
//     recur(N/2,x+Math.pow(2,N-1),y+Math.pow(2,N-1));
// }

// function print2DArrayAsPlane(arr) {
//     let height = arr.length;
//     let width = arr[0].length;
  
//     // 2차원 배열을 평면에 출력
//     for (let y = 0; y < height; y++) {
//         let row = '';
//         for (let x = 0; x < width; x++) {
//             row += arr[y][x] + ' ';
//         }
//         console.log(row);
//     }
// }