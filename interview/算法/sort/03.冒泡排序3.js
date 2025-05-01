// 基于进阶版 冒泡排序2 而来
function bubbleSort(nums) {
  let isSorted = true;
  let lastSortIndex = nums.length - 1;
  let isSortedIndex = -1;
  while (isSorted) {
    isSorted = false;
    for (let j = 0; j < lastSortIndex; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        isSorted = true
        isSortedIndex = j;
      }
    }

    lastSortIndex = isSortedIndex;
  }

  return nums
}

console.log(bubbleSort([2, 1, 3, 4, 8, 6, 2, 1]))
