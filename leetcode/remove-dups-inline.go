package main

import "fmt"

func removeDups(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	write := 1

	for read := 1; read < len(nums); read++ {
		if nums[read] != nums[read-1] {
			nums[write] = nums[read]
			write++
		}
	}

	return write
}

func main() {
	dups := []int{1, 1, 2, 2, 2, 4, 4, 5, 5, 5, 7, 7, 8}
	k := removeDups(dups)
	fmt.Println(k, dups[:k])
}
