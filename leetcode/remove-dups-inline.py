def removeDups(nums):
    if not nums:
        return 0

    write = 1

    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1

    return write


nums = [1, 1, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 6, 6, 8, 8]
k = removeDups(nums)
print(k, nums[:k])
