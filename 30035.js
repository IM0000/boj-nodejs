const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30035.txt';

const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.trim().split(' '));

const [totalUsers, numTiers] = input.shift().map(Number);
let remainingUsers = totalUsers;

const targetTier = input.pop()[0];
const tiers = {};

// 티어 정보 처리
input.forEach(([tierName, capacity]) => {
  let allocatedUsers;

  if (capacity.includes('%')) {
    const percentage = parseInt(capacity.slice(0, -1), 10);
    allocatedUsers = Math.floor((remainingUsers * percentage) / 100);
  } else {
    const maxCapacity = parseInt(capacity, 10);
    allocatedUsers = Math.min(remainingUsers, maxCapacity);
  }

  tiers[tierName] = allocatedUsers;
  remainingUsers -= allocatedUsers;
});

// 남은 유저가 있는지 확인
if (remainingUsers > 0) {
  console.log('Invalid System');
  process.exit();
}

// 세분화된 티어인지 확인
const isSubTier = [1, 2, 3, 4].includes(+targetTier[targetTier.length - 1]);
const tierName = isSubTier
  ? targetTier.slice(0, targetTier.length - 1)
  : targetTier;

// 존재하지 않는 티어일 경우
if (!tiers[tierName]) {
  console.log('Liar');
  process.exit();
}

// 세분화된 티어에 대한 처리
if (isSubTier) {
  const subTierIndex = +targetTier[targetTier.length - 1];
  const tierSize = tiers[tierName];
  const subTierSize = Math.ceil(tierSize / 4);
  const subTiers = [];

  for (let i = 0; i < 4; i++) {
    if (tierSize - i * subTierSize > 0) {
      subTiers.push(Math.min(subTierSize, tierSize - i * subTierSize));
    }
  }

  if (subTierIndex > subTiers.length) {
    console.log('Liar');
    process.exit();
  }

  let base = Object.entries(tiers)
    .slice(0, Object.keys(tiers).indexOf(tierName))
    .reduce((sum, [_, size]) => sum + size, 0);

  for (let i = 0; i < subTierIndex - 1; i++) {
    base += subTiers[i];
  }

  console.log(base + 1, base + subTiers[subTierIndex - 1]);
} else {
  let base = Object.entries(tiers)
    .slice(0, Object.keys(tiers).indexOf(tierName))
    .reduce((sum, [_, size]) => sum + size, 0);

  console.log(base + 1, base + tiers[tierName]);
}
