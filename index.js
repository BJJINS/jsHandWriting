// 删除有序数组的重复项
const removeDuplicates = (nums) => {
  if (!nums.length) {
    return 0;
  }

  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }

    fast++;
  }
};

// 移除元素
const removeElement = (nums, val) => {
  if (!nums.length) {
    return 0;
  }

  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  fast++;
};

// 移动零
const removeZeros = (nums) => {
  if (!nums.length) {
    return nums;
  }

  let slow = 0;
  let fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }

    fast++;
  }

  return nums;
};

/**
 *
 * @param {string} s
 * @param {number} l
 * @param {number} r
 */
const palindrome = (s, l, r) => {
  while (l >= 0 && r <= s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.substring(l + 1, r);
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    const str1 = palindrome(s, i, i);
    const str2 = palindrome(s, i, i + 1);
    res = res.length > str1.length ? res : str1;
    res = res.length > str2.length ? res : str2;
  }
  return res;
};

// console.log(longestPalindrome("11"))

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var diameterOfBinaryTree = function (root) {
  let maxDiameter = 0;
  const maxDepth = (root) => {
    if (!root) {
      return 0;
    }

    const leftMax = maxDepth(root.left);
    const rightMax = maxDepth(root.right);

    const depth = leftMax + rightMax;
    maxDiameter = Math.max(depth, maxDiameter);

    return 1 + Math.max(leftMax, rightMax);
  };
  maxDepth(root);
  return maxDiameter;
};

var diameterOfBinaryTree = function (root) {
  let ans = 0;
  const dfs = (node) => {
    if (!node) {
      return 0;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    ans = Math.max(ans, left + right);
    return Math.max(left, right) + 1;
  };
  dfs(root);
  return ans;
};

const module = device.createShaderModule({
  label: "our hardcoded red triangle shaders",
  code: `
    @vertex fn vs(
      @builtin(vertex_index) vertexIndex : u32
    ) -> @builtin(position) vec4f {
      let pos = array(
        vec2f( 0.0,  0.5),  // top center
        vec2f(-0.5, -0.5),  // bottom left
        vec2f( 0.5, -0.5)   // bottom right
      );

      return vec4f(pos[vertexIndex], 0.0, 1.0);
    }

    @fragment fn fs() -> @location(0) vec4f {
      return vec4f(1.0, 0.0, 0.0, 1.0);
    }
  `,
});
/**@type{ HTMLCanvasElement } */
const canvas = document.getElementById("canvas");
