const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17387.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [x1, y1, x2, y2] = input[0].split(' ').map(Number);
const [x3, y3, x4, y4] = input[1].split(' ').map(Number);

let p1 = [x1, y1];
let p2 = [x2, y2];
let p3 = [x3, y3];
let p4 = [x4, y4];

let result = 0;
// case1. 완전교차
if(ccw(p1, p2, p3) * ccw(p1, p2, p4) < 0 && ccw(p3, p4, p1) * ccw(p3, p4, p2) < 0) {
  result = 1;
}

// case2. 다른선분의 한점이 다른 선분 위에
if((ccw(p1,p2,p3) * ccw(p1,p2,p4) === 0 && ccw(p3,p4,p1) * ccw(p3,p4,p2) < 0)
|| (ccw(p1,p2,p3) * ccw(p1,p2,p4) < 0 && ccw(p3,p4,p1) * ccw(p3,p4,p2) === 0)) {
  result = 1;
}

// case3. 다른선분의 한점이 다른 선분의 한점과 동일
if(ccw(p1, p2, p3) * ccw(p1, p2, p4) === 0 && ccw(p3, p4, p1) * ccw(p3, p4, p2) === 0) {
  if(p1[0] === p3[0] && p1[1] === p3[1]) result = 1;
  if(p1[0] === p4[0] && p1[1] === p4[1]) result = 1;
  if(p2[0] === p3[0] && p2[1] === p3[1]) result = 1;
  if(p2[0] === p4[0] && p2[1] === p4[1]) result = 1;
}

// case4. 선분 2개가 일직선이고 만남
if(ccw(p1,p2,p3) === 0 && ccw(p1,p2,p4) === 0 && ccw(p3,p4,p1) === 0 && ccw(p3,p4,p2) === 0) {
  // 한점이 같은경우
  // if(p1[0] === p3[0] && p1[1] === p3[1]) result = 1;
  // if(p1[0] === p4[0] && p1[1] === p4[1]) result = 1;
  // if(p2[0] === p3[0] && p2[1] === p3[1]) result = 1;
  // if(p2[0] === p4[0] && p2[1] === p4[1]) result = 1;

  // 교차하는 경우
  if(p1[0] <= Math.max(p3[0], p4[0]) 
  && p1[0] >= Math.min(p3[0], p4[0]) 
  && p1[1] <= Math.max(p3[1], p4[1]) 
  && p1[1] >= Math.min(p3[1], p4[1])) result = 1;

  if(p2[0] <= Math.max(p3[0], p4[0]) 
  && p2[0] >= Math.min(p3[0], p4[0]) 
  && p2[1] <= Math.max(p3[1], p4[1]) 
  && p2[1] >= Math.min(p3[1], p4[1])) result = 1;
  
  if(p3[0] <= Math.max(p1[0], p2[0]) 
  && p3[0] >= Math.min(p1[0], p2[0]) 
  && p3[1] <= Math.max(p1[1], p2[1]) 
  && p3[1] >= Math.min(p1[1], p2[1])) result = 1;

  if(p4[0] <= Math.max(p1[0], p2[0]) 
  && p4[0] >= Math.min(p1[0], p2[0]) 
  && p4[1] <= Math.max(p1[1], p2[1]) 
  && p4[1] >= Math.min(p1[1], p2[1])) result = 1;
}

console.log(result);


function vector(p1, p2) {
  let [x1,y1] = p1;
  let [x2,y2] = p2;
  return [x2-x1, y2-y1];
}

function cross(v1, v2) {
  let [x1,y1] = v1;
  let [x2,y2] = v2;
  return x1*y2 - x2*y1;
}

function ccw(p1, p2, p3) {
  let v1 = vector(p1, p2);
  let v2 = vector(p1, p3);
  let result = cross(v1, v2);
  if(result > 0) return 1;
  else if(result < 0) return -1;
  else return 0;
}