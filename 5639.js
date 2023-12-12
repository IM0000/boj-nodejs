const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5639.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n').map(Number);

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function preToPost(preOrder) {
  let index = 0;

  function makeBTree(min, max) {
    if(index >= preOrder.length || preOrder[index] < min || preOrder[index] > max) {
      return null;
    }

    let data = preOrder[index++];
  
    let root   = new TreeNode(data);
    root.left  = makeBTree(min, data);
    root.right = makeBTree(data, max);

    return root;
  }

  let root = makeBTree(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  let postOrderArr = [];

  function postOrder(root, postOrderArr) {
    if(root === null) {
      return;
    }

    postOrder(root.left, postOrderArr);
    postOrder(root.right, postOrderArr);
    postOrderArr.push(root.data);
  }

  postOrder(root, postOrderArr);

  return postOrderArr;
}

console.log(preToPost(input).join('\n'));