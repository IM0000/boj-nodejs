// mahjong
// 머리 7개가 되는지 확인, 안되면 몸통4 머리1 확인
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14552.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let tileCount = Array(10).fill(0);

for (let tile of input) {
  tileCount[tile]++;
}

let waitingTiles = [];

// 1부터 확인
for (let tileToAdd = 1; tileToAdd <= 9; tileToAdd++) {
  if (tileCount[tileToAdd] >= 4) continue; // 동일 숫자 4개인건 패스, 안되는 케이스

  let newTileCount = [...tileCount]; // 현재 마작 복사
  newTileCount[tileToAdd] += 1;

  let sevenPairs = 0;
  // 머리 확인
  for (let tile = 1; tile <= 9; tile++) {
    if (newTileCount[tile] === 2) {
      sevenPairs += 1;
    }
  }

  // 머리 7개가 된다면 추가
  if (sevenPairs === 7) {
    waitingTiles.push(tileToAdd);
    continue;
  }

  if (isCompleteHand(newTileCount, 0, 0, 1)) {
    waitingTiles.push(tileToAdd);
  }
}

if (waitingTiles.length > 0) {
  waitingTiles.sort((a, b) => a - b);
  console.log(waitingTiles.join(' '));
} else {
  console.log(-1);
}

function isCompleteHand(currentTiles, pairCount, meldCount, startTile) {
  if (pairCount === 1 && meldCount === 4) {
    return true;
  }

  for (let tile = startTile; tile <= 9; tile++) {
    // 패를 가지고 있으면 확인
    if (currentTiles[tile] > 0) {
      // 패 3개 이상이고 몸통 4개 이하인 경우 몸통 증가
      if (currentTiles[tile] >= 3 && meldCount < 4) {
        currentTiles[tile] -= 3;
        if (isCompleteHand(currentTiles, pairCount, meldCount + 1, tile)) {
          currentTiles[tile] += 3;
          return true;
        }
        currentTiles[tile] += 3;
      }

      // 패가 2개 이상이고, 머리가 없으면 머리 증가
      if (currentTiles[tile] >= 2 && pairCount === 0) {
        currentTiles[tile] -= 2;
        if (isCompleteHand(currentTiles, pairCount + 1, meldCount, tile)) {
          currentTiles[tile] += 2;
          return true;
        }
        currentTiles[tile] += 2;
      }

      // 연속된 3개 숫자 확인
      if (
        tile <= 7 &&
        currentTiles[tile + 1] > 0 &&
        currentTiles[tile + 2] > 0 &&
        meldCount < 4
      ) {
        currentTiles[tile] -= 1;
        currentTiles[tile + 1] -= 1;
        currentTiles[tile + 2] -= 1;
        if (isCompleteHand(currentTiles, pairCount, meldCount + 1, tile)) {
          currentTiles[tile] += 1;
          currentTiles[tile + 1] += 1;
          currentTiles[tile + 2] += 1;
          return true;
        }
        currentTiles[tile] += 1;
        currentTiles[tile + 1] += 1;
        currentTiles[tile + 2] += 1;
      }

      return false;
    }
  }

  return pairCount === 1 && meldCount === 4;
}
