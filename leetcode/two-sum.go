package main

import "fmt"

// twoSum finds indices of two numbers in nums that add up to target.
// It uses a hash map to store the complement of each value seen so far.
func twoSum(nums []int, target int) []int {
	seen := make(map[int]int) // value -> index
	for i, v := range nums {
		if j, ok := seen[target-v]; ok {
			return []int{j, i}
		}
		seen[v] = i
	}
	return nil
}

// Demo usage.
func main() {
	nums := []int{2, 7, 11, 15}
	target := 9
	fmt.Println(twoSum(nums, target)) // [0 1]
}
