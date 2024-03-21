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

console.log(longestPalindrome("11"))
