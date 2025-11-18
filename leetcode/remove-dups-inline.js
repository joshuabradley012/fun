/*
removeDuplicates walks the sorted array once, using two pointers:
- read scans every element from left to right.
- write marks where the next unique value should be placed.
Because the array is sorted, duplicates are adjacent. Each time nums[read] differs from nums[read - 1], we’ve found a new unique value. We copy it to nums[write] (which may be the same index) and advance write. After the loop, indices [0, write - 1] contain the unique values in order, so returning write gives k, the count of uniques. Any data beyond write is ignored.
Two-pointer patterns shine when you can exploit sorted or partitioned data. Here the sorted order meant duplicates cluster together, so one pointer can read ahead while another writes compacted results in place. Whenever a problem asks you to modify an array without extra space, look for structure (sorted, partitioned, windowed) that lets you keep slow/fast indices to minimize work while preserving constraints.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
        return 0;
    }

    let write = 1;

    for (let read = 1; read < nums.length; read++) {
        if (nums[read] !== nums[read - 1]) {
            nums[write] = nums[read];
            write++;
        }
    }

    return write;
};