// twoSum returns indices of two numbers in nums that sum to target.
// Uses a hash map to track complements seen so far in O(n) time.
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i += 1) {
    const v = nums[i];
    const complementIndex = seen.get(target - v);

    if (complementIndex !== undefined) {
      return [complementIndex, i];
    }

    seen.set(v, i);
  }

  return [];
}

// Demo usage
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // [0, 1]

