const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const [N, M, x, y, K] = input[0].split(' ').map(Number);
  const map = [];
  for (let i = 1; i <= N; i++) {
    map.push(input[i].split(' ').map(Number));
  }
  const commands = input[N + 1].split(' ').map(Number);

  const dx = [0, 0, 0, -1, 1]; // Using 1-based indexing: 1=E, 2=W, 3=N, 4=S
  const dy = [0, 1, -1, 0, 0];

  let dice = [0, 0, 0, 0, 0, 0, 0]; // 1-indexed dice faces
  let posX = x,
    posY = y;

  function roll_dice(direction) {
    // Roll the dice based on the direction
    let newDice = [...dice];
    if (direction === 1) {
      // East
      newDice[1] = dice[4];
      newDice[3] = dice[1];
      newDice[4] = dice[6];
      newDice[6] = dice[3];
    } else if (direction === 2) {
      // West
      newDice[1] = dice[3];
      newDice[3] = dice[6];
      newDice[4] = dice[1];
      newDice[6] = dice[4];
    } else if (direction === 3) {
      // North
      newDice[1] = dice[5];
      newDice[2] = dice[1];
      newDice[5] = dice[6];
      newDice[6] = dice[2];
    } else if (direction === 4) {
      // South
      newDice[1] = dice[2];
      newDice[2] = dice[6];
      newDice[5] = dice[1];
      newDice[6] = dice[5];
    }
    return newDice;
  }

  commands.forEach((command) => {
    let nx = posX + dx[command];
    let ny = posY + dy[command];

    if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
      // Roll the dice
      dice = roll_dice(command);

      // Update the map and the dice
      if (map[nx][ny] === 0) {
        map[nx][ny] = dice[6];
      } else {
        dice[6] = map[nx][ny];
        map[nx][ny] = 0;
      }

      // Update the dice position
      posX = nx;
      posY = ny;

      // Print the top face of the dice
      console.log(dice[1]);
    }
  });
});
