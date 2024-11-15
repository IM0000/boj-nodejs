const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const gatherScores = input[1].split(' ').map(Number);
const watchScores = input[2].split(' ').map(Number);

function countMissionWays(N, M, gatherScores, watchScores) {
  function backtrack(day, prevLocation, currentScore) {
    if (day === N) {
      return currentScore >= M ? 1 : 0;
    }

    let ways = 0;
    for (let location = 0; location < 3; location++) {
      for (let task = 0; task < 2; task++) {
        let score = task === 0 ? gatherScores[location] : watchScores[location];
        if (location === prevLocation) {
          score = Math.floor(score / 2);
        }
        ways += backtrack(day + 1, location, currentScore + score);
      }
    }
    return ways;
  }

  return backtrack(0, -1, 0);
}

const result = countMissionWays(N, M, gatherScores, watchScores);
console.log(result);
