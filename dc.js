function divideAndConquer(arr, start, end) {
    if (start === end) return arr[start];

    let result = Number.MIN_SAFE_INTEGER;
    const mid = Math.floor((start + end) / 2);

    // 부분합의 최대값이 mid를 포함하여 걸치는 상황
    let left = Number.MIN_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;

    let leftSum = 0;
    let rightSum = 0;

    for (let i = mid; i >= start; i--) {
        leftSum += arr[i];
        left = Math.max(left, leftSum);
    }

    for (let i = mid + 1; i <= end; i++) {
        rightSum += arr[i];
        right = Math.max(right, rightSum);
    }

    // 부분합이 mid를 기준으로 한 쪽에 생기는 상황
    result = Math.max(divideAndConquer(arr, start, mid), divideAndConquer(arr, mid + 1, end));
    result = Math.max(result, left + right);
    return result;
}

// 예시 입력
const arr = [-3, 0, -1, 3, 5, -2, -4];
const result = divideAndConquer(arr, 0, arr.length - 1);
console.log(result);
